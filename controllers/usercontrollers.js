const mysqlpool = require("../db");
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const { hashPassword, verifyPassword } = require("../utils/passwordCompare");
const crypto = require('crypto');

function createResponseObject(isError,message,data=null){
    const responseObject={
        isError:isError,
        message:message
    };

    if(data != null){
        responseObject.data= data;
    }
    return responseObject;
}

// const createResponseObject =require("../utils/responseObject");
const { isErrored } = require("stream");
const getusers = async (req, res) => {
  try {
    const data = await mysqlpool.query(
      "select * from messagingdashboard.users"
    );

    if (!data) {
      const response = createResponseObject(true, "No record found");
      return res.status(404).json(response);
    }
    const response = createResponseObject(false, "All ussers data", {
      data: data[0],
    });
    return res.status(200).json(response);
  } catch (err) {
    const response = createResponseObject(true, "Internal Server Error", {
      err,
    });
    return res.status(500).json(response);
  }
};

const AuthData = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Username and password:", username, password);

    const [users] = await mysqlpool.query(
      "SELECT * FROM messagingdashboard.users WHERE UserName = ?",
      [username]
    );

    if (!users || users.length === 0) {
      const response = createResponseObject(false, "User does not exist");
      return res.status(404).json(response);
    }

    const user = users[0]; // Assuming username is unique, take the first result

    // Retrieve the stored salt and hashed password
    const { Password: storedPassword, Salt: storedSalt } = user;

    // Verify the password
    if (!verifyPassword(password, storedPassword, storedSalt)) {
      const response = createResponseObject(false, "Invalid password");
      return res.status(401).json(response);
    }

    // Fetch user details including role information using JOIN
    const query = `
      SELECT u.FirstName, u.LastName, u.IsActive, u.CreatedDate, r.RoleName, r.Description
      FROM messagingdashboard.users u
      INNER JOIN messagingdashboard.userrolemapping urm ON u.UserId = urm.UserId
      INNER JOIN messagingdashboard.role r ON urm.RoleId = r.RoleId
      WHERE u.UserId = ?;
    `;

    const [userDetails] = await mysqlpool.query(query, [user.UserId]);

    // Generate JWT token
    const token = jwt.sign(
      {
        UserId: user.UserId,
        UserName: user.UserName,
        RoleName: userDetails[0].RoleName,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30min" }
    );

    // Return JSON response with authentication details
    const response = createResponseObject(false, "Authentication successful", {
      accessToken: token,
      user: {
        UserId: user.UserId,
        UserName: user.UserName,
        FirstName: userDetails[0].FirstName,
        LastName: userDetails[0].LastName,
        IsActive: userDetails[0].IsActive,
        RoleName: userDetails[0].RoleName,
        Description: userDetails[0].Description,
        CreatedDate: userDetails[0].CreatedDate,
        // Add other user details as needed
      },
    });

    res.status(200).json(response);
  } catch (err) {
    const response = createResponseObject(true, "Server error", err.message);
    res.status(500).json(response);
  }
};

const CreateUser = async (req, res) => {
  const { UserName, FirstName, LastName, Password } = req.body;

  try {
    // Validate email format
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!UserName.match(emailRegex)) {
      return res
        .status(400)
        .json(createResponseObject(true, "Invalid email format"));
    }

    // Check if user already exists
    const [existingUser] = await mysqlpool.query(
      "SELECT * FROM Users WHERE UserName = ?",
      [UserName]
    );

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json(createResponseObject(true, "User already exists"));
    }

    // Generate salt
    const salt = crypto.randomBytes(16).toString("hex");
    // Hash the password with the salt
    const hash = crypto
      .pbkdf2Sync(Password, salt, 1000, 64, "sha512")
      .toString("hex");
    const hashedPassword = `${salt}:${hash}`;

    // Insert user into the database
    const sql = `
          INSERT INTO Users (UserName, FirstName, LastName, Password, isActive, CreatedDate)
          VALUES (?, ?, ?, ?, true, CURDATE())
      `;
    const values = [UserName, FirstName, LastName, hashedPassword];

    const [result] = await mysqlpool.query(sql, values);
    console.log(`Inserted user with ID ${result.insertId}`);

    // Prepare success response
    const response = createResponseObject(false, "User inserted successfully", {
      userId: result.insertId,
    });

    res.status(200).json(response);
  } catch (error) {
    // Handle internal server error
    console.error("Error creating user:", error);
    const response = createResponseObject(true, "Internal Server Error");
    res.status(500).json(response);
  }
};

const canUpdateUserData = async (req, res, next) => {
  const { UserName } = req.body;
  // Check if user is SuperAdmin
  console.log(UserName, ".............");
  const [users] = await mysqlpool.query(
    "SELECT * FROM messagingdashboard.users WHERE UserName = ?",
    [UserName]
  );

  if (!users || users.length === 0) {
    return res.status(404).json({
      success: false,
      message: "User does not exist",
    });
  }

  const user = users[0];
  if (user.userRole === "superadmin") {
    return res.send({
      userRole: user.userRole,
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "user forund",
    });

    // Allow SuperAdmin to proceed
    // return next();
  }
};

module.exports = { getusers, AuthData, CreateUser, canUpdateUserData };
