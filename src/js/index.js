import '../scss/main.scss';
import './modules/listeners.js';
import './modules/screenGameControl.js';

// To make sure that we are in development mode
if (process.env.NODE_ENV !== 'production') {
  console.log('----------------------');
  console.log('Looks like we are in development mode!');
  console.log('----------------------');
}
