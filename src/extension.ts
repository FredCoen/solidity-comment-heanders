// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	let disposable = vscode.commands.registerCommand('solidity-comment-heanders.headerInsert', async () => {
		await vscode.window.showInputBox({title: "Please enter your header comment below", placeHolder: "Type your header comment"}).then((input)=>{
			if(!input) {return;}
			const spaces = (Math.floor((64-input.length) / 2))+4;
			const output =  "/*//////////////////////////////////////////////////////////////\n"
				.padEnd(64+spaces,' ')
				.concat(`${input}\n    //////////////////////////////////////////////////////////////*/`);
	
			const editor = vscode.window.activeTextEditor;
			if (editor) {
				editor.edit(editBuilder => {
					editBuilder.insert(editor.selection.active, output);
				});
			}
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
