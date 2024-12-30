import * as fs from 'fs';
import * as path from 'path';

export const addLog = (message: string, logFile: string = 'logs.txt'): void => {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    const logFilePath = path.join(__dirname, logFile);

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Erreur lors de l\'écriture dans le fichier de log:', err);
        }
    });
};

addLog('Le serveur a démarré avec succès.');
