import hbs from "handlebars";
import * as fs from "fs";
function read() {
    return new Promise((resolve, reject) => {
        let header = null;
        let body = null;
        function finish() {
            if (header == null || body == null) return;
            resolve({
                header: header,
                body: body
            });
        }
        fs.readFile("./b.html", { encoding: "utf8" }, (err, data) => {
            if (err) throw reject(err);
            header = data;
            finish();
        });
        fs.readFile("./a.html", { encoding: "utf8" }, (err, data) => {
            if (err) throw reject(err);
            body = data;
            finish();
        });
    })
}

read().then((obj) => {
    hbs.registerPartial("header", obj.header);
    const html = hbs.compile(obj.body);
    console.log(html());
}).catch((err) => {
    console.error(err);
});
