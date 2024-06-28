const mysqlpool = require("../db");
const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const { hashPassword, verifyPassword } = require("../utils/passwordCompare");

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
      data: data[0]
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
    // decrypt the password and then check

    const [users] = await mysqlpool.query(
      "SELECT * FROM messagingdashboard.users WHERE UserName = ?",
      [username]
    );

    if (!users || users.length === 0) {
      const response = createResponseObject(false, "User does not exist");
      return res.status(404).json(response);
    }

    const user = users[0]; // Assuming username is unique, take the first result

    // Step 2: Verify password

    if (verifyPassword(password, user.Password)) {
      const response = createResponseObject(true, "Invalid password");
      return res.status(401).json(response);
    }

    // Step 3: Fetch user details including role information using JOIN
    const query = `
            SELECT u.FirstName, u.LastName, u.IsActive, u.CreatedDate, r.RoleName, r.Description
            FROM messagingdashboard.users u
            INNER JOIN messagingdashboard.userrolemapping urm ON u.UserId = urm.UserId
            INNER JOIN messagingdashboard.role r ON urm.RoleId = r.RoleId
            WHERE u.UserId = ?;
        `;

    const [userDetails] = await mysqlpool.query(query, [user.UserId]);

    // Step 4: Generate JWT token
    const token = jwt.sign(
      {
        UserId: user.UserId,
        UserName: user.UserName,
        RoleName: userDetails[0].RoleName,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30min" }
    );

    // Step 5: Return JSON response with authentication details
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
    const sql = `
        INSERT INTO Users (UserName, FirstName, LastName, Password, isActive, CreatedDate)
        VALUES (?, ?, ?, ?, true, CURDATE())
      `;
    const values = [UserName, FirstName, LastName, Password];

    const [result] = await mysqlpool.query(sql, values);
    console.log(`Inserted user with ID ${result.insertId}`);
    const response = createResponseObject(false, "User inserted successfully", {
      userId: result.insertId,
    });

    res.status(200).json(response);
  } catch (error) {
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
