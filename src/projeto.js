function Activity(activityID, InveniRAstdID, DiscordChID, SlackChID, DiscordUsrId, SlackUsrId, MsgDiscord, MsgSlack, NumDiscord, NumSlack, MedNumDiscord, MedNumSlack,DataUltMsgDiscord, DataUltMsgSlack) { // criar a estrutura do protótipo

    this.activityID = activityID
    this.InveniRAstdID = InveniRAstdID
    this.DiscordChID = DiscordChID
    this.SlackChID = SlackChID
    this.DiscordUsrId = DiscordUsrId
    this.SlackUsrId = SlackUsrId
    this.MsgDiscord = MsgDiscord
    this.MsgSlack = MsgSlack
    this.NumDiscord = NumDiscord
    this.NumSlack = NumSlack
    this.MedNumDiscord = MedNumDiscord
    this.MedNumSlack = MedNumSlack
    this.DataUltMsgDiscord = DataUltMsgDiscord
    this.DataUltMsgSlack = DataUltMsgSlack

    var msg = 
            {
                "activityID": this.activityID,
                "InveniRAstdID": this.InveniRAstdID,
                "DiscordChID": this.DiscordChID,
                "SlackChID": this.SlackChID,
                "DiscordUsrId":this.DiscordUsrId,
                "SlackUsrId": this.SlackUsrId,
                "quantAnalytics": [{
                        "MsgSlack": this.MsgSlack
                    },
                    {
                        "MsgDiscord": this.MsgDiscord
                    },
                    {
                        "NumSlack": this.NumSlack
                    },
                    {
                        "NumDiscord": this.NumDiscord
                    },
                    {
                        "MedNumSlack": this.MedNumSlack
                    },
                    {
                        "MedNumDiscord": this.MedNumDiscord
                    }
                ],
                "qualAnalytics": [{
                        "DataUltMsgSlack": this.DataUltMsgSlack
                    },
                    {
                        "DataUltMsgDiscord": this.DataUltMsgDiscord
                    }
                ]
        
        
            }

        return msg
}

function ActivityPrototype(proto) { // cria uma nova instancia do protótipo (clone)
    this.proto = proto;

    this.clone = function () {
        var activity = new Activity();

        activity.activityID = proto.activityID
        activity.InveniRAstdID = proto.InveniRAstdID
        activity.DiscordChID = proto.DiscordChID
        activity.SlackChID = proto.SlackChID
        activity.DiscordUsrId = proto.DiscordUsrId
        activity.SlackUsrId = proto.SlackUsrId
        activity.quantAnalytics[0] = proto.quantAnalytics[0]
        activity.quantAnalytics[1] = proto.quantAnalytics[1]
        activity.quantAnalytics[2] = proto.quantAnalytics[2]
        activity.quantAnalytics[3] = proto.quantAnalytics[3]
        activity.quantAnalytics[4] = proto.quantAnalytics[4]
        activity.quantAnalytics[5] = proto.quantAnalytics[5]
        activity.qualAnalytics[0] = proto.qualAnalytics[0]
        activity.qualAnalytics[1] = proto.qualAnalytics[1]
        
        return activity;
    };
}

function cA(){ // função para exibir em console log info introduzida
    var config = new configActivity()
    console.log('Simulação de configuração da atividade com os seguintes parametros (json_param):')
    console.log(config)
}

function rP(){ // função para exibir nº aluno (simula obtenção dos parametros)
    var ActID = 12345
    var StdID = 75309

    document.getElementById("numAluno").textContent='Atividade aluno n.º ' + StdID;
}
var receberParams = function(){ // carrega parametros ficticios; COMPONENTE no Padrão de Estrutura Decorator
    this.ActID = 12345
    this.StdID = 75309 
}

var configActivity = function(){ // configura a atividade; COMPONENTE no Padrão de Estrutura Decorator
    this.discord = document.getElementById("ChDiscord").value;
    this.slack = document.getElementById("ChSlack").value;   
}

var getActivity = function(){   // obtem a atividade realizada pelo aluno; COMPONENTE no Padrão de Estrutura Decorator

    this.IdStdDiscord = document.getElementById("IdDiscord").value;
    this.IdStdSlack = document.getElementById("IdSlack").value;  
}

var getAnalyticsStd = function(){ // simula analiticas da atividade; COMPONENTE no Padrão de Estrutura Decorator

    this.quantA = ['tem msg Discord?','tem msg Slack?', 'nº msg discord','nº msg slack','media msg discord','media msg slack']
    this.qualA =['data ultima msg discord', 'data ultima msg slack']
}

var Decorator = function(params,config,getAct){ // DECORATOR no Padrão de Estrutura Decorator

    this.params = params
    this.ActID = params.ActID
    this.StdID = params.StdID
    this.config = config
    this.discord = config.discord
    this.slack = config.slack
    this.getAct = getAct
    this.IdStdDiscord = getAct.IdStdDiscord
    this.IdStdSlack = getAct.IdStdSlack
}

function runPrototype() { // executa Padrão de Criação Protótipo e Padrão de Estrutura Decorator

    var params = new receberParams()
    var config = new configActivity()
    var getAct = new getActivity()
    var analiticas = new getAnalyticsStd()
    
    var decorated = new Decorator(params,config,getAct) // Padrão Estrutura - Decorator

    var proto = new Activity(decorated.ActID,decorated.StdID,decorated.discord,decorated.slack,decorated.IdStdDiscord,decorated.IdStdSlack,analiticas.quantA[0],analiticas.quantA[1],analiticas.quantA[2],analiticas.quantA[3],analiticas.quantA[4],analiticas.quantA[5],analiticas.qualA[0],analiticas.qualA[1]) 
    var prototype = new ActivityPrototype(proto);
    var newActivity = prototype.clone(); // Padrão Criação - Prototype

    console.log("Clone do protótipo Activity: ")
    console.log(newActivity)

    console.log("Atividade: " + newActivity.activityID+ ';'+" Nº Aluno: " + newActivity.InveniRAstdID)


    // modifica página HTML exemplo
    var output = document.getElementById('output');    
    output.innerHTML = "<b>Instância da atividade do aluno: </b><br/><br/>" + JSON.stringify(newActivity, undefined, 2) ;   
    
    document.getElementById('StdProto').style.visibility = "visible"
    
    return newActivity
    
}
