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
  if (req.user.rolename !== "superadmin" && req.user.rolename !== "admin") {
    const response = createResponseObject(true, "Access denied");
    return res.status(403).json(response);
  }

  try {
    let data;
    const username = req.params.username;

    // Check if a username parameter is provided
    if (username) {
      // Fetch data for a single user
      data = await mysqlpool.query(
        "SELECT * FROM messagingdashboard.users WHERE username = ?",
        [username]
      );
    } else {
      // Fetch data for all users
      data = await mysqlpool.query("SELECT * FROM messagingdashboard.users");
    }

    if (!data.length) {
      const response = createResponseObject(true, "No record found");
      return res.status(404).json(response);
    }

    const response = createResponseObject(false, "User data retrieved", {
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

module.exports = getusers;

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

    // Check if user is trying to update their own username or IsActive
    if (req.user.UserName === UserName && req.user.RoleName !== "superadmin") {
      let errorMessage = "";
      if (newUserName !== undefined) {
        errorMessage = "You cannot update username";
      }
      if (IsActive !== undefined) {
        errorMessage = "You cannot update IsActive status";
      }
      return res.status(403).json({
        success: false,
        message: errorMessage,
      });
    }

    // Check if user is allowed to update (superadmin or different user)
    if (req.user.UserName !== UserName && req.user.RoleName !== "superadmin") {
      return res.status(403).json({
        success: false,
        message: "User is not allowed to update",
      });
    }

    // Begin transaction
    connection = await mysqlpool.getConnection();
    await connection.beginTransaction();

    // Construct the update query dynamically based on permissions
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
    if (RoleName !== undefined && req.user.RoleName === "superadmin") {
      updateSql += "RoleName = ?, ";
      updateValues.push(RoleName);
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

    // Execute update query
    await connection.query(updateSql, updateValues);

    // Commit transaction
    await connection.commit();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    if (connection) {
      // Rollback transaction on error
      await connection.rollback();
    }
    console.error("Error updating user:", error);
    const response = createResponseObject(true, "Internal Server Error");
    res.status(500).json(response);
  } finally {
    if (connection) {
      connection.release(); // Release connection back to pool
    }
  }
};

// const canUpdateUserData = async (req, res) => {
//   let connection;
//   try {
//     const { UserName } = req.params;
//     const { FirstName, LastName, IsActive, RoleName, UserName: newUserName } = req.body;

//     // Fetch the user to check if they exist
//     const [users] = await mysqlpool.query(
//       'SELECT * FROM messagingdashboard.users WHERE UserName = ?',
//       [UserName]
//     );

//     // Check if user exists
//     if (!users || users.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'User does not exist',
//       });
//     }

//     // Check if user is allowed to update
//     if (req.user.UserName !== UserName && req.user.RoleName !== 'superadmin') {
//       const response = createResponseObject(true, 'User is not allowed to update');
//       return res.status(403).json(response);
//     }

//     // Begin transaction
//     connection = await mysqlpool.getConnection();
//     await connection.beginTransaction();

//     // Construct the update query dynamically based on permissions
//     let updateSql = 'UPDATE messagingdashboard.users SET ';
//     const updateValues = [];

//     if (FirstName !== undefined) {
//       updateSql += 'FirstName = ?, ';
//       updateValues.push(FirstName);
//     }
//     if (LastName !== undefined) {
//       updateSql += 'LastName = ?, ';
//       updateValues.push(LastName);
//     }
//     if (IsActive !== undefined && req.user.RoleName === 'superadmin') {
//       updateSql += 'IsActive = ?, ';
//       updateValues.push(IsActive);
//     }
//     if (RoleName !== undefined && req.user.RoleName === 'superadmin') {
//       updateSql += 'RoleName = ?, ';
//       updateValues.push(RoleName);
//     }
//     if (newUserName !== undefined && req.user.RoleName === 'superadmin') {
//       updateSql += 'UserName = ?, ';
//       updateValues.push(newUserName);
//     }

//     // Remove trailing comma and space from updateSql
//     updateSql = updateSql.slice(0, -2);

//     // Add WHERE clause
//     updateSql += ' WHERE UserName = ?';
//     updateValues.push(UserName);

//     // Execute update query
//     await connection.query(updateSql, updateValues);

//     // Commit transaction
//     await connection.commit();

//     return res.status(200).json({
//       success: true,
//       message: 'User updated successfully',
//     });
//   } catch (error) {
//     if (connection) {
//       // Rollback transaction on error
//       await connection.rollback();
//     }
//     console.error('Error updating user:', error);
//     const response = createResponseObject(true, 'Internal Server Error');
//     res.status(500).json(response);
//   } finally {
//     if (connection) {
//       connection.release(); // Release connection back to pool
//     }
//   }
// };

const deleteData = async (req, res) => {
  const { UserName } = req.body;

  try {
    const sql = `DELETE FROM users WHERE LOWER(UserName) = LOWER(?)`;
    const result = await mysqlpool.query(sql, UserName);
    console.log("resutl is ", result[0]);

    if (result[0].affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err) {
    console.error("Error executing MySQL query:", err);
    res.status(500).json({ error: "Error deleting user" });
  }
};

module.exports = {
  getusers,
  AuthData,
  CreateUser,
  canUpdateUserData,
  deleteData,
};
