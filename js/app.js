const side = document.getElementsByClassName("side");
const exibir = document.getElementById("exibirNoticia");
const cadastrar = document.getElementById("cadastrarNoticia");
const fecharForm = document.getElementById("fecharForm");
const cancelarForm = document.getElementById("cancelarForm");
const buscar = document.getElementById("buscarNoticia");
const inputTexto = document.getElementById("textoNoticia");
const btnModal = document.querySelectorAll(".navBar");
const fade = document.getElementsByClassName("fade");

let textoCadastrar, textoConteudo, tituloF, conteudoF, textoBuscar;
let arrConteudo = [], arrBuscar = [];
let objNoticia = {};

//console.log(btnModal[0].children[0]);

//localStorage
localStorage.dbNoticias = "[]";

//Botao cadastra menu
cadastrar.addEventListener("click", function(){

    inputTexto.value = "";
   
    textoCadastrar = "";
    textoCadastrar += `
                    <form action="#" class="formulario">
                        <input type="text" id="tituloForm" placeholder="Digite o título">
                        <textarea name="" id="noticiaForm" cols="30" rows="10" placeholder="Digite o conteudo"></textarea>
                        <div class="divBotoes">
                        <input id="cadastrarForm" onclick="inserirNoticia()" type="button" value="CADASTRAR" >
                        <input id ="cancelarForm" onclick="limparFormulario()" type="button" value="CANCELAR">
                        <input id="fecharForm" onclick="fecharFormulario()" type="button" value="FECHAR">
                        </div>
                    
                    </form>`

    side[0].innerHTML = textoCadastrar;
});

//botao cadastrar noticiaformulario
function inserirNoticia(){

    //cadForm = document.getElementById("cadastrarForm");    
    tituloF = document.getElementById("tituloForm");
    conteudoF = document.getElementById("noticiaForm");

    //console.log(tituloF);

    if(tituloF.value && conteudoF.value){

        objNoticia = {
            titulo: `${tituloF.value}`,
            noticia: `${conteudoF.value}`,
            status: true
         };
    
        arrConteudo.push(objNoticia);
    
        localStorage.setItem("dbNoticias", JSON.stringify(arrConteudo));
    
        alert("Registro Ativo Incluído Com Sucesso ! ! !");

    }else{

        alert("Dados de Entrada Inválidos ! ! !");

    }

     //limpando formulario
     tituloF.value = "";
     conteudoF.value = "";
     tituloF.focus();

};

//botao buscar noticia manu
buscar.addEventListener("click", function(){

    arrBuscar = [];

    textoBuscar = inputTexto.value;
    //inputTexto.blur();

    if(textoBuscar){

        //buca banco localStorage
        arrConteudo = JSON.parse(localStorage.getItem("dbNoticias"));

        //buscando
        arrConteudo.forEach(function(noticia){

            if(noticia.titulo.match(textoBuscar) || noticia.noticia.match(textoBuscar)){
                objNoticia = {
                            titulo: `${noticia.titulo}`,
                            noticia: `${noticia.noticia}`,
                            status: true
                };

                arrBuscar.push(objNoticia);

            }else{


            }

        });

        objNoticia = {};

        textoCadastrar = "";

        textoCadastrar += `<div class="divNoticias">`;

        arrBuscar.forEach(function(elemento){

            textoCadastrar += `
                                <div class="itemNoticias">
                                    <p><b>${elemento.titulo}</b></p>
                                    <span>${elemento.noticia}<span>
                                </div>
                                `;

        });

        side[0].innerHTML = textoCadastrar;

    }

});

//botao cancelar noticia formulario
function limparFormulario(){

    tituloF = document.getElementById("tituloForm");
    conteudoF = document.getElementById("noticiaForm");

    tituloF.value = "";
    conteudoF.value = "";
    tituloF.focus();

}

//botao fechar noticia formulario
function fecharFormulario(){

    textoCadastrar ="";
    
    side[0].innerHTML = textoCadastrar;

}
//botao exibir noticias
exibir.addEventListener("click", function(){

    //console.log("Ola");

    inputTexto.value = "";
    
    arrConteudo = JSON.parse(localStorage.getItem("dbNoticias"));

    textoCadastrar = "";

    textoCadastrar += `<div class="divNoticias">`;

    arrConteudo.forEach(element => {

        textoCadastrar += `
                            <div class="itemNoticias">
                                <p><b>${element.titulo}</b></p>
                                <span>${element.noticia}<span>
                            </div>
                            `
        
    });

    textoCadastrar += `</div>`;

    side[0].innerHTML = textoCadastrar;

});

//open Modal
btnModal[0].children[0].addEventListener("click", function(){

    textoConteudo = "";

    textoConteudo += `<div class="fade">

                        <div class="modal">

                            <div class="headerModal">
                                <p>Este é Um Modal</p>
                                <div id="btnFechar" onclick="fecharModal()">Fechar</div>
                            </div>
                            <div class="bodyModal">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Dolorem assumenda consequuntur perspiciatis, cupiditate eligendi, incidunt 
                                    fugit esse autem eos sapiente non. Molestias corrupti fugiat aspernatur 
                                    aliquid repellat magni delectus animi.
                                </p>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Dolorem assumenda consequuntur perspiciatis,  Molestias corrupti fugiat aspernatur 
                                    aliquid repellat magni delectus animi.
                                </p>
                            </div>

                        </div>

                    </div>`

    side[0].innerHTML = textoConteudo; 

    fade[0].style.display = "block";

});

//close Modal
function fecharModal(){
    fade[0].style.display = "none";
}