const mysqlpool = require("../db");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
const { hashPassword, verifyPassword } = require("../utils/passwordCompare");
const crypto = require("crypto");

function createResponseObject(isError, message, data = null) {
  const responseObject = {
    isError: isError,
    message: message,
  };

  if (data != null) {
    responseObject.data = data;
  }
  return responseObject;
  uirytuijgh;
}

const getusers = async (req, res) => {
  // Ensure the user has the correct role
  if (req.user.RoleName !== "superadmin" && req.user.RoleName !== "admin") {
    const response = createResponseObject(true, "Access denied");
    return res.status(403).json(response);
  }

  try {
    let data;
    const username = req.params.UserName;

    // SQL query to fetch specific columns including RoleName and Description
    let sql = `
      SELECT u.CreatedDate, r.Description, u.FirstName, u.IsActive,
             u.LastName, r.RoleName, u.UserId, u.UserName
      FROM messagingdashboard.users u
      LEFT JOIN messagingdashboard.userrolemapping urm ON u.UserId = urm.UserId
      LEFT JOIN messagingdashboard.role r ON urm.RoleId = r.RoleId
    `;

    // If a username parameter is provided, filter by username
    const params = [];
    if (username) {
      sql += `WHERE u.UserName = ?`;
      params.push(username);
    }

    data = await mysqlpool.query(sql, params);

    if (!data.length) {
      const response = createResponseObject(true, "No record found");
      return res.status(404).json(response);
    }

    // If fetching data for a single user, return the first record
    const responseData = {
      data: username ? data[0] : data[0],
    };

    const response = createResponseObject(false, "User data retrieved", responseData);
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
    const { UserName, Password } = req.body;
    console.log("Username and password:", UserName, Password);

    const [users] = await mysqlpool.query(
      "SELECT * FROM messagingdashboard.users WHERE UserName = ?",
      [UserName]
    );

    if (!users || users.length === 0) {
      const response = createResponseObject(false, "User does not exist");
      return res.status(404).json(response);
    }

    const user = users[0]; // Assuming username is unique, take the first result

    // Retrieve the stored salt and hashed password
    const { Password: storedPassword } = user;

    if (!user.IsActive) {
      const response = createResponseObject(
        false,
        "User is not active, contact admin"
      );
      return res.status(404).json(response);
    }

    // Verify the password
    if (!(await verifyPassword(Password, storedPassword))) {
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
    console.log("userdetails we are creatring is", userDetails);
    // Generate JWT token
    const token = jwt.sign(
      {
        UserId: user?.UserId,
        UserName: user?.UserName,
        RoleName: userDetails[0]?.RoleName,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30min" }
    );

    // Return JSON response with authentication details
    const response = createResponseObject(false, "Authentication successful", {
      accessToken: token,
      user: {
        UserId: user?.UserId,
        UserName: user?.UserName,
        FirstName: userDetails[0]?.FirstName,
        LastName: userDetails[0]?.LastName,
        IsActive: userDetails[0]?.IsActive,
        RoleName: userDetails[0]?.RoleName,
        Description: userDetails[0]?.Description,
        CreatedDate: userDetails[0]?.CreatedDate,
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
  if (req.user.RoleName === "superadmin") {
    const { UserName, FirstName, LastName, RoleName, Password } = req.body;

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

      // Hash the password with the salt using PBKDF2
      const hash = crypto
        .pbkdf2Sync(Password, salt, 1000, 64, "sha512")
        .toString("hex");

      // Store salt and hash in a structured format
      const hashedPassword = JSON.stringify({ salt, hash });

      // Insert user into the Users table
      const sqlInsertUser = `
      INSERT INTO Users (UserName, FirstName, LastName, Password, isActive, CreatedDate)
      VALUES (?, ?, ?, ?, true, CURDATE())
    `;
      const valuesInsertUser = [UserName, FirstName, LastName, hashedPassword];

      const [userResult] = await mysqlpool.query(
        sqlInsertUser,
        valuesInsertUser
      );
      const userId = userResult.insertId;
      console.log(`Inserted user with ID ${userId}`);

      // Find RoleId corresponding to RoleName
      const sqlSelectRole = `
      SELECT RoleId FROM role WHERE RoleName = ?
    `;
      const [roleRows] = await mysqlpool.query(sqlSelectRole, [RoleName]);

      if (roleRows.length === 0) {
        // If role not found, handle error or assign a default role
        const response = createResponseObject(true, "Role not found");
        return res.status(400).json(response);
      }

      const roleId = roleRows[0].RoleId;

      // Insert into userrolemapping table
      const sqlInsertUserRoleMapping = `
      INSERT INTO userrolemapping (UserId, RoleId)
      VALUES (?, ?)
    `;
      const valuesInsertUserRoleMapping = [userId, roleId];

      await mysqlpool.query(
        sqlInsertUserRoleMapping,
        valuesInsertUserRoleMapping
      );
      console.log(
        `Inserted user role mapping for user ID ${userId} and role ID ${roleId}`
      );

      // Prepare success response
      const response = createResponseObject(
        false,
        "User inserted successfully",
        {
          userId,
        }
      );

      res.status(200).json(response);
    } catch (error) {
      // Handle internal server error
      console.error("Error creating user:", error);
      const response = createResponseObject(true, "Internal Server Error");
      res.status(500).json(response);
    }
  } else {
    const response = createResponseObject(
      true,
      "User is not allowed to perform this action"
    );
    res.status(403).json(response);
  }
};

const canUpdateUserData = async (req, res) => {
  let connection;
  try {
    const { UserName } = req.params;
    const {
      FirstName,
      LastName,
      IsActive,
      RoleName,
      UserName: newUserName,
    } = req.body;

    // Fetch the user to check if they exist
    const [users] = await mysqlpool.query(
      "SELECT * FROM messagingdashboard.users WHERE UserName = ?",
      [UserName]
    );

    // Check if user exists
    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User does not exist",
      });
    }

    // Check permissions for updating RoleName
    if (RoleName !== undefined && req.user.RoleName === "superadmin") {
      // Fetch roleId corresponding to RoleName from role table
      const [roles] = await mysqlpool.query(
        "SELECT RoleId FROM messagingdashboard.role WHERE RoleName = ?",
        [RoleName]
      );

      if (!roles || roles.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Role does not exist",
        });
      }

      const roleId = roles[0].RoleId;

      // Begin transaction
      connection = await mysqlpool.getConnection();
      await connection.beginTransaction();

      // Update roleId in userrolemapping table
      await connection.query(
        "UPDATE messagingdashboard.userrolemapping SET RoleId = ? WHERE UserId = ?",
        [roleId, users[0].UserId]
      );

      // Commit transaction
      await connection.commit();
    }

    // Construct the update query for users table
    let updateSql = "UPDATE messagingdashboard.users SET ";
    const updateValues = [];

    if (FirstName !== undefined) {
      updateSql += "FirstName = ?, ";
      updateValues.push(FirstName);
    }
    if (LastName !== undefined) {
      updateSql += "LastName = ?, ";
      updateValues.push(LastName);
    }
    if (IsActive !== undefined && req.user.RoleName === "superadmin") {
      updateSql += "IsActive = ?, ";
      updateValues.push(IsActive);
    }
    if (newUserName !== undefined && req.user.RoleName === "superadmin") {
      updateSql += "UserName = ?, ";
      updateValues.push(newUserName);
    }

    // Remove trailing comma and space from updateSql
    updateSql = updateSql.slice(0, -2);

    // Add WHERE clause
    updateSql += " WHERE UserName = ?";
    updateValues.push(UserName);

    // Execute update query for users table
    await connection.query(updateSql, updateValues);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error updating user:", error);
    const response = createResponseObject(true, "Internal Server Error");
    res.status(500).json(response);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};


const deleteData = async (req, res) => {
  const { UserName } = req.body;

  let connection;
  try {
    // Begin transaction
    connection = await mysqlpool.getConnection();
    await connection.beginTransaction();

    // Select UserId from users table
    const selectUserIdSql = `SELECT UserId FROM users WHERE LOWER(UserName) = LOWER(?)`;
    const [userRows] = await connection.query(selectUserIdSql, [UserName]);

    // Check if user exists
    if (userRows.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userRows[0].UserId;

    // Delete from userrolemapping table
    const deleteUserRoleMappingSql = `DELETE FROM userrolemapping WHERE UserId = ?`;
    await connection.query(deleteUserRoleMappingSql, [userId]);

    // Delete from users table
    const deleteUsersSql = `DELETE FROM users WHERE UserId = ?`;
    await connection.query(deleteUsersSql, [userId]);

    // Commit transaction
    await connection.commit();

    return res.status(200).json({ message: "User and associated role mappings deleted successfully" });
  } catch (err) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error executing MySQL query:", err);
    return res.status(500).json({ error: "Error deleting user and associated role mappings" });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};



module.exports = {
  getusers,
  AuthData,
  CreateUser,
  canUpdateUserData,
  deleteData,
};
