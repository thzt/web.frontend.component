import viewModelTool from './src/index';

// other es6 module can use `import viewModelTool from '...'`
export default viewModelTool;

// this will import to window.viewModelTool
export { viewModelTool };