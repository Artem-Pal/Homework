const express = require("express");
const router = express.Router();

router.get("/numbers/:id", (req, res)=>{
    function number_to_string (num) {
        var def_translite = {
            null: 'ноль',
            a1: ['один','два','три','четыре','пять','шесть','семь','восемь','девять'],
            a2: ['одна','две','три','четыре','пять','шесть','семь','восемь','девять'],
            a10: ['десять','одиннадцать','двенадцать','тринадцать','четырнадцать','пятнадцать','шестнадцать','семнадцать','восемнадцать','девятнадцать'],
            a20: ['двадцать','тридцать','сорок','пятьдесят','шестьдесят','семьдесят','восемьдесят','девяносто'],
            a100: ['сто','двести','триста','четыреста','пятьсот','шестьсот','семьсот','восемьсот','девятьсот'],
            u3: ['тысяча', 'тысячи', 'тысяч'],
            u2: ['миллион', 'миллиона', 'миллионов'],
            u1: ['миллиард', 'миллиарда', 'миллиардов'],
        }
        var i1, i2, i3, kop, out, rub, v, zeros, _ref, _ref1, _ref2, ax;

        _ref = parseFloat(num).toFixed(2).split('.'), rub = _ref[0], kop = _ref[1];
        var leading_zeros = 12 - rub.length;
        if (leading_zeros < 0) {
            return false;
        }

        var zeros = [];
        while (leading_zeros--) {
            zeros.push('0');
        }
        rub = zeros.join('') + rub;
        var out = [];
        if (rub > 0) {
            _ref1 = str_split(rub, 3);
            for (var i = -1; i < _ref1.length;i++) {
                v = _ref1[i];
                if (!(v > 0)) continue;
                _ref2 = str_split(v, 1), i1 = parseInt(_ref2[0]), i2 = parseInt(_ref2[1]), i3 = parseInt(_ref2[2]);
                out.push(def_translite.a100[i1-1]); // 1xx-9xx
                ax = (i+1 == 3) ? 'a2' : 'a1';
                if (i2 > 1) {
                    out.push(def_translite.a20[i2-2] + (i3 > 0 ? ' ' + def_translite[ax][i3-1] : '')); // 20-99
                } else {
                    out.push(i2 > 0 ? def_translite.a10[i3] : def_translite[ax][i3-1]); // 10-19 | 1-9
                }

                if (_ref1.length > i+1){
                    var name = def_translite['u'+(i+1)];
                    out.push(morph(v,name));
                }
            }
        } else {
            out.push(def_translite.null);
        }

        return out.join(' ').replace(RegExp(' {2,}', 'g'), ' ').trimLeft();
    };

    function morph(number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[Math.min(number%10, 5)] ];
    };

    function str_split(string, length) {
        var chunks, len, pos;

        string = (string == null) ? "" : string;
        length = (length == null) ? 1 : length;

        var chunks = [];
        var pos = 0;
        var len = string.length;
        while (pos < len) {
            chunks.push(string.slice(pos, pos += length));
        }

        return chunks;
    };


    var id = req.params.id;
    id = number_to_string(id);


    res.send(id);
});

router.post("/urav/:a/:b/:c", (req, res)=>{

    var a = req.params.a;
    var b = req.params.b;
    var c = req.params.c;
    var diz = eval(Math.pow(b,2)-4*a*c);
    var e = eval((-b+Math.sqrt(diz))/(2*a));
    var e1 = eval((-b-Math.sqrt(diz))/(2*a));
    var e2 = eval(- c/b);
    var e3 = eval(-b/2*a);
    var x1 ;
    var x2 ;

    if(a==0 && b==0 && c==0)
    {
        x1 = "Любое число";
        x2 = "Любое число";
    }
    else
    if(a==0 && b==0 && c!=0)
    {
        x1 = "Решения нет";
        x2 = "Решения нет";
    }
    else
    if(a==0 && b!=0 && c!=0)
    {
        x1 =eval(e2);
        x2 =" ";
    }
    else
    if(a!=0 && diz>0)
    {
        x1=eval(e);
        x2=eval(e1);
    }
    else
    if(a!=0 && diz==0)
    {
        x1=eval(e3);
        x2=" ";
    }
    else
    {
        x1 = "Решения нет";
        x2 = "Решения нет";
    }
    res.send(x1.value=x1);
    res.send(x2.value=x2);

});

router.get("/day/:date", (req,res)=>{
    const moment = require('moment');
    var date = req.params.date;
    res.send(moment(date, 'DD.MM.YYYY').format('dddd'));
    moment.locale('ru');
});

router.put("/fun4", (req, res)=>{
    res.send({method: "PUT"});
});

router.delete("/fun5", (req, res)=>{
    res.send({method: "DELETE"});
});

module.exports = router;