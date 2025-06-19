/**
 * Helper function to download the current value of a local storage item.
 *
 * @param {string} storageKey - The key to use for the local storage.
 * @param {string} filename - The filename to use for the download.
 * @param {string} extension - The extension to use for the download.
 * @returns {void}
 */
export function downloadLocalStorage(
  storageKey: string,
  filename: string,
  extension: string = "json"
) {
  const data = localStorage.getItem(storageKey);

  if (!data) return;

  const date = new Date().toISOString();
  const jsonData = JSON.stringify(JSON.parse(data), null, 2);
  const blob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;

  a.download = filename + date + "." + extension;

  document.body.appendChild(a);

  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

/**
 * Helper function to upload and restore a saved state from a JSON file.
 * 
 * @param {string} storageKey - The key to use for the local storage.
 * @returns {Promise<void>}
 */
export function uploadLocalStorage(storageKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const data = JSON.parse(content);
          localStorage.setItem(storageKey, JSON.stringify(data));
          resolve();
        } catch (error) {
          reject(new Error('Invalid JSON file. ' + error));
        }
      };
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    };

    input.click();
  });
}

/**
 * Helper function to clear the local storage.
 * 
 * @param {string} storageKey - The key to use for the local storage.
 * @returns {Promise<void>}
 */
export function clearLocalStorage(storageKey: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      localStorage.removeItem(storageKey);
      resolve();
    } catch (error) {
      reject(new Error('Failed to clear local storage. ' + error));
    }
  });
}
