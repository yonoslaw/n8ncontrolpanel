const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

const projectsDir = path.join(__dirname, 'projects');
const publicDir = path.join(__dirname, 'public');

// Middleware
app.use(express.static(publicDir));
app.use(express.json());

// Ensure projects directory exists
fs.mkdir(projectsDir, { recursive: true });

// API Endpoints

// List all projects
app.get('/api/projects', async (req, res) => {
    try {
        const files = await fs.readdir(projectsDir);
        const projects = files
            .filter(file => file.endsWith('.json'))
            .map(file => file.replace('.json', ''));
        res.json(projects);
    } catch (error) {
        console.error('Error listing projects:', error);
        res.status(500).send('Server error');
    }
});

// Get a specific project's data
app.get('/api/projects/:name', async (req, res) => {
    const projectName = req.params.name;
    const filePath = path.join(projectsDir, `${projectName}.json`);
    try {
        const data = await fs.readFile(filePath, 'utf8');
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).send('Project not found');
        } else {
            console.error(`Error reading project ${projectName}:`, error);
            res.status(500).send('Server error');
        }
    }
});

// Create a new project
app.post('/api/projects', async (req, res) => {
    const { name } = req.body;
    if (!name || !/^[a-zA-Z0-9_-]+$/.test(name)) {
        return res.status(400).send('Invalid project name. Use letters, numbers, underscores, or hyphens.');
    }
    const filePath = path.join(projectsDir, `${name}.json`);

    try {
        // Check if file already exists
        await fs.access(filePath);
        return res.status(409).send('Project with this name already exists.');
    } catch (error) {
        // File does not exist, which is what we want.
        const initialData = { fields: [] };
        await fs.writeFile(filePath, JSON.stringify(initialData, null, 2));
        res.status(201).json({ message: 'Project created successfully', name });
    }
});

// Save/Update a project
app.post('/api/projects/:name', async (req, res) => {
    const projectName = req.params.name;
    const filePath = path.join(projectsDir, `${projectName}.json`);
    try {
        await fs.writeFile(filePath, JSON.stringify(req.body, null, 2));
        res.status(200).send('Project saved successfully.');
    } catch (error) {
        console.error(`Error saving project ${projectName}:`, error);
        res.status(500).send('Server error');
    }
});

// Delete a project
app.delete('/api/projects/:name', async (req, res) => {
    const projectName = req.params.name;
    const filePath = path.join(projectsDir, `${projectName}.json`);
    try {
        await fs.unlink(filePath);
        res.status(200).send('Project deleted successfully.');
    } catch (error) {
        if (error.code === 'ENOENT') {
            return res.status(404).send('Project not found.');
        }
        console.error(`Error deleting project ${projectName}:`, error);
        res.status(500).send('Server error');
    }
});

// Get a specific project's public config
app.get('/projects/:name', async (req, res) => {
    const projectName = req.params.name;
    const filePath = path.join(projectsDir, `${projectName}.json`);
    try {
        const fileData = await fs.readFile(filePath, 'utf8');
        const projectData = JSON.parse(fileData);
        const configObject = projectData.fields.reduce((obj, field) => {
            const sanitizedName = field.name.trim().replace(/[^a-zA-Z0-9]+/g, '_');
            if (sanitizedName) {
                obj[sanitizedName] = field.value;
            }
            return obj;
        }, {});
        res.json(configObject);
    } catch (error) {
        if (error.code === 'ENOENT') {
            res.status(404).send('Project not found');
        } else {
            console.error(`Error reading project config ${projectName}:`, error);
            res.status(500).send('Server error');
        }
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
