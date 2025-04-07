let json = '';

    process.stdin.on('data', chunk => {
      json += chunk;
    });

    process.stdin.on('end', () => {
      try {
        const data = JSON.parse(json);
        const resources = data.resources || [];
        const grouped = {};

        resources.forEach(res => {
          const folder = res.folder || 'root'; // Use 'root' if no folder
          const url = res.secure_url;
          if (!grouped[folder]) {
            grouped[folder] = [];
          }
          grouped[folder].push(url);
        });

        let output = '';
        // Sort folders alphabetically for consistent output
        const sortedFolders = Object.keys(grouped).sort();

        for (const folder of sortedFolders) {
          output += `Folder: ${folder}\n`;
          // Sort URLs within each folder
          grouped[folder].sort().forEach(url => {
            output += `${url}\n`;
          });
          output += '\n'; // Add a blank line between folders
        }

        process.stdout.write(output);

      } catch (e) {
        console.error('Error processing Cloudinary data:', e.message);
        // Also print the received JSON to help debug if parsing fails
        console.error('Received JSON:', json.substring(0, 500) + (json.length > 500 ? '...' : ''));
        process.exit(1);
      }
    });

    process.stdin.on('error', (err) => {
      console.error('Error reading stdin:', err);
      process.exit(1);
    });
