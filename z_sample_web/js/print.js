function printWithoutComments(target){
    var printContent = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"\n'
    printContent += '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n'
    printContent += '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n'
    printContent += '<head>'
    printContent += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n'
    printContent += '<title>Issue magazine</title>\n'
    printContent += '<link rel="stylesheet" href="permalink.css" type="text/css" media="screen" title="screen styles" charset="utf-8">\n'
    printContent += '<link rel="stylesheet" href="print.css" type="text/css" media="print" charset="utf-8">\n'
    printContent += '<script type="text/javascript" charset="utf-8" src="../lib/prototype.js"></script>\n'
    printContent += '<script type="text/javascript" charset="utf-8" src="remove4print.js"></script>\n'
    printContent += '</head>\n'
    printContent += '<body onload="remove4print();">\n'
    printContent += '<div id="theme">\n'
    printContent += '   <p class="themeNumber"><em>issue</em> #0</p>\n'
    printContent += '   <p class="themeName">Publishing Online</p>\n'
    printContent += '   <p class="themeDates">from 17.03.08<br />to 22.03.08</p>\n'
    printContent += '</div>\n'
    printContent += '<div id="content">\n'
    printContent += '<div class="post">\n'
    printContent += target.parentNode.parentNode.parentNode.innerHTML+'</div></div></body></html>'
    
    mapopup = window.open("print.html", "Impression", "width=450,height=700,resizable,scrollbars=yes,status=1");
    mapopup.document.write(printContent);
    mapopup.document.close();
}
function printWithComments(target){
    var printContent = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"\n'
    printContent += '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n'
    printContent += '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n'
    printContent += '<head>'
    printContent += '<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n'
    printContent += '<title>Issue magazine</title>\n'
    printContent += '<link rel="stylesheet" href="permalink.css" type="text/css" media="screen" title="screen styles" charset="utf-8">\n'
    printContent += '<link rel="stylesheet" href="print2.css" type="text/css" media="print" charset="utf-8">\n'
    printContent += '<script type="text/javascript" charset="utf-8" src="../lib/prototype.js"></script>\n'
    printContent += '<script type="text/javascript" charset="utf-8" src="remove4print.js"></script>\n'
    printContent += '</head>\n'
    printContent += '<body onload="removeTools();">\n'
    printContent += '<div id="theme">\n'
    printContent += '   <p class="themeNumber"><em>issue</em> #0</p>\n'
    printContent += '   <p class="themeName">Publishing Online</p>\n'
    printContent += '   <p class="themeDates">from 17.03.08<br />to 22.03.08</p>\n'
    printContent += '</div>\n'
    printContent += '<div id="content">\n'
    printContent += '<div class="post">\n'
    printContent += target.parentNode.parentNode.parentNode.innerHTML+'</div></div></body></html>'
    
    mapopup = window.open("print.html", "Impression", "width=450,height=700,resizable,scrollbars=yes,status=1");
    mapopup.document.write(printContent);
    mapopup.document.close();
}