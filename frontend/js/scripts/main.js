import {abi,endereco} from './contract.js'
import {conectar} from './conect.js'

conectar();

var registerContract = web3.eth.contract(abi);
var register = registerContract.at(endereco);
var registerEvent = register.myUser();

$("#button1").click(function(){
    $("#loader").show();
    register.registerUser(
        $("#fNome").val(),$("#fIdade").val(),$("#fCPF").val(),$("#fCargo").val(),$("#fHash").val(),function(error,result){
            if(!error){
                console.log("ok");
                $("#loader").hide();
                //o alerta aguarda até que esse evento seja emitido e o ative
                registerEvent.watch(function(err,result){
                    if(!err){
                        alert("cadastro efetuado com sucesso");
                    }
                });
            }
            else {
                console.error(error);
                $("#loader").hide();
                alert("cadastro não efetuado");
            }
        }
    )
});
