const vscode = require('vscode');

function activate(context) {
  let disposable =
      vscode.commands.registerCommand('extension.countLines', function() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          vscode.window.showInformationMessage('Нет открытого файла!');
          return;
        }

        const text = editor.document.getText();
        const lines = text.split('\n');

        let totalLines = lines.length;
        let emptyLines = 0;
        let commentLines = 0;

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed === '') {
            emptyLines++;
          } else if (trimmed.startsWith('//')) {
            commentLines++;
          }
        }

        vscode.window.showInformationMessage(`Всего строк: ${
            totalLines}, Пустых: ${emptyLines}, Комментариев: ${commentLines}`);
      });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
