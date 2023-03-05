function getPrintPageHtml(contentToAdd: string, title: string) {
  const documentContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <base href="/" />
         <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ادارة البحوث الفنية</title>
        <style>
        h2{
          text-align:center
        }
         table{
          margin:5px
        }
        table, th, td {
          border: 1px solid;
          text-align:center;
          font-size:15px
        }
         body {
          height:98vh;
          width:100vw;
          border: 2px solid black;
        }
       
        </style>
    </head>
    <body>
        <h2>
            ${title}
        </h2>
        <div style="display:flex;flex-direction:column;align-self:center;width:95vw">
    
         ${contentToAdd}
        </div>
        <div style="position: absolute; bottom: 45px;font-size:25px">
            <div style="display:flex; justify-content: space-around; width:95vw;">
            
             
              <div style="text-align:center;width:45vw;">
                (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
               <br/>
                توقـيـــع الســـيـــد المــديــر 
              </div>
              <div style="text-align:center;width:45vw;">
                (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)
               <br/>
                توقـيـــع الســـيـــد النــائــب 
              </div>
            </div>
        </div>
    </body>
    </html>
    
    `;
  return documentContent;
}
export default getPrintPageHtml;
