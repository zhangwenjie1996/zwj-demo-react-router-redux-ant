import common from "./common";
import warn from './warn';
import inventory from './inventory';
import activiti from './activiti';
import maintain from './maintain';
import patrol from './patrol';
import project from './project'
import alteration from './alteration';
import evaluation from './evaluation';
import hr from "./hr";
import login from "./login";
import form from "./form";
let final = Object.assign(form,common,login,  warn, maintain, patrol, inventory, activiti, project, alteration, hr, evaluation);
export default final;