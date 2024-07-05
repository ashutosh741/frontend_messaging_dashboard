const mysqlpool = require("../db"); // Assuming this is your MySQL connection pool setup
const mysql = require("mysql2/promise");

const createTemplate = async (req, res) => {
    try {
        if (req.body.RoleName !== "superadmin") {
            throw new Error('Unauthorized: Only SuperAdmin can create templates.');
        }
        
        const { TemplateId, Content, CreatedBy, Status } = req.body;

        // Check if templateId already exists
        const [existingTemplates] = await mysqlpool.query(
            "SELECT * FROM smstemplate WHERE TemplateId = ?",
            [TemplateId]
        );

        if (existingTemplates.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'TemplateId already exists'
            });
        }

        // Insert template into smstemplate table
        const sqlInsertTemplate = `
            INSERT INTO smstemplate (TemplateId, Content, CreatedBy, CreatedDateTime, Status)
            VALUES (?, ?, ?, NOW(), ?)
        `;
        const valuesInsertTemplate = [TemplateId, Content, CreatedBy, Status];

        const [TemplateResult] = await mysqlpool.query(
            sqlInsertTemplate,
            valuesInsertTemplate
        );

        if (TemplateResult.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: 'Template created successfully'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Failed to create template'
            });
        }
    } catch (error) {
        console.error('Error creating template:', error);
        return res.status(500).json({
            success: false,
            message: 'Error creating template'
        });
    }
}



const updateTemplate = async (req, res) => {
    try {
        const { Content, Status } = req.body;
        const loggedInUser = req.user; // Assuming req.user contains logged-in user info
        const TemplateId = req.params.TemplateId; // Extract TemplateId from endpoint URL
        
        // Check if user is authorized to update templates
        if (loggedInUser.RoleName !== "superadmin" && loggedInUser.RoleName !== "admin") {
            throw new Error('Unauthorized: Only SuperAdmin or Admin can update templates.');
        }

        // Check if Admin can update only their own data
        if (loggedInUser.RoleName === "admin" && loggedInUser.UserName !== UpdatedBy) {
            throw new Error('Unauthorized: Admin can only update their own data.');
        }
console.log(loggedInUser.UserName);
        // Check if templateId exists
        const [existingTemplates] = await mysqlpool.query(
            "SELECT * FROM smstemplate WHERE TemplateId = ?",
            [TemplateId]
        );

        if (existingTemplates.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'TemplateId not found'
            });
        }

        // Update template in smstemplate table
        const sqlUpdateTemplate = `
            UPDATE smstemplate
            SET Content = ?, UpdatedBy = ?,UpdatedDateTime = NOW(), Status = ?
            WHERE TemplateId = ?
        `;
        const valuesUpdateTemplate = [Content, loggedInUser.UserName, Status, TemplateId];

        const [TemplateResult] = await mysqlpool.query(
            sqlUpdateTemplate,
            valuesUpdateTemplate
        );

        if (TemplateResult.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: 'Template updated successfully'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Failed to update template'
            });
        }
    } catch (error) {
        console.error('Error updating template:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Error updating template'
        });
    }
}

const deleteTemplate = async (req, res) => {
    try {
        const loggedInUser = req.user; // Assuming req.user contains logged-in user info
        const TemplateId = req.params.TemplateId; // Extract TemplateId from endpoint URL
        
        // Check if user is authorized to delete templates (only superadmin allowed)
        if (loggedInUser.RoleName !== "superadmin") {
            throw new Error('Unauthorized: Only SuperAdmin can delete templates.');
        }

        // Check if templateId exists
        const [existingTemplates] = await mysqlpool.query(
            "SELECT * FROM smstemplate WHERE TemplateId = ?",
            [TemplateId]
        );

        if (existingTemplates.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'TemplateId not found'
            });
        }

        // Delete template from smstemplate table
        const sqlDeleteTemplate = `
            DELETE FROM smstemplate
            WHERE TemplateId = ?
        `;

        const [deleteResult] = await mysqlpool.query(
            sqlDeleteTemplate,
            [TemplateId]
        );

        if (deleteResult.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: 'Template deleted successfully'
            });
        } else {
            return res.status(500).json({
                success: false,
                message: 'Failed to delete template'
            });
        }
    } catch (error) {
        console.error('Error deleting template:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Error deleting template'
        });
    }
}

const fetchAllTemplates = async (req, res) => {
    try {
        // Fetch all templates from smstemplate table
        const [templates] = await mysqlpool.query(
            "SELECT * FROM smstemplate"
        );

        // Return the fetched templates
        return res.status(200).json({
            success: true,
            templates: templates,
            message: 'Fetched all templates successfully'
        });
    } catch (error) {
        console.error('Error fetching templates:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Error fetching templates'
        });
    }
}

module.exports = {
    createTemplate,
    updateTemplate,deleteTemplate,fetchAllTemplates
};
