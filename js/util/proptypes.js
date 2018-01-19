
export default class PropTypes {
    static props = function (a, key, value) {
        function textfield(key, value) {
            return '<div class="properties-entry textfield" data-entry="' + key + '" ><label for="' + key + '">' + value + '</label><div class="field-wrapper"><input id="' + key + '" type="text" name="' + key + '" ></div></div> ';
        };
        function textbox(key, value) {
            return '<div class="properties-entry textbox" data-entry="' + key + '"><label for="' + key + '">' + value + '</label><div class="field-wrapper"><textarea  id="' + key + '"   name="' + key + '"></textarea></div></div>'
        };
        function select(key, value) {
            return '<div class="properties-entry textfield" data-entry="' + key + '"><label for="' + key + '">' + value + '</label><div class="field-wrapper"><select id="' + key + '"   name="' + key + '"><option value ="volvo">Volvo</option><option value ="saab">Saab</option><option value="opel">Opel</option><option value="audi">Audi</option></select></div></div> ';
        };
        function form(key, value) {
            return '<div class="properties-entry textbox" data-entry="' + key + '"><label for="' + key + '">' + value + '</label><div class="field-wrapper"><table border="1"><tr><th>id</th><th>name</th><th>type</th><th>expression</th><th>variable</th><th>default</th><th>pattern</th><th>require</th><th>read</th><th>write</th><th>formvalues</th></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td> </tr> </table></div></div>';
        };
        function listener(key, value) {
            return '<div class="properties-entry textbox" data-entry="' + key + '"><label for="' + key + '">' + value + '</label><div class="field-wrapper"><table border="1"><tr><th>listener</th><th>type</th><th>event</th><th>fields</th></tr><tr><td></td><td></td><td></td><td></td> </tr> </table></div></div>';
        };
        console.log(eval(a))
        return eval(a)(key, value);
    }
};