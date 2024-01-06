var inputLettre = document.getElementById("inputLettre");
var affichageMot = document.getElementById("affichageMot");
var affichageErr = document.getElementById("affichageErr");
var affichageScore = document.getElementById("affichageScore");
var affichageLettre = document.getElementById("affichageLettre");
var informacion = document.getElementById("informacion");
var gameRules = document.getElementById("gameRules");
var entiendo = document.getElementById("entiendo");
var pokeList = ["abo","abra","aeromite","akwakwak","alakazam","amonistar","amonita","aquali","arbok","arcanin","artikodin","aspicot","boustiflor","bulbizarre","canarticho","caninos","carabaffe","carapuce","chenipan","chetiflor","chrysacier","coconfort","colossinge","crustabri","dardargnan","dodrio","doduo","dracaufeu","draco","dracolosse","ectoplasma","electhor","electrode","elektek","empiflor","evoli","excelangue","fantominus","ferosinge","feunard","flagadoss","florizarre","galopa","goupix","gravalanch","grodoudou","grolem","grotadmorv","herbizarre","hypnomade","hypocean","hypotrempe","insecateur","kabuto","kabutops","kadabra","kangourex","kicklee","kokiyas","krabboss","krabby","lamantine","leveinard","leviator","lippoutou","lokhlass","mmime","machoc","machopeur","mackogneur","magicarpe","magmar","magneti","magneton","melodelfe","melofee","metamorph","mew","mewtwo","miaouss","mimitoss","minidraco","mystherbe","nidoking","nidoqueen","nidoran","nidorina","nidorino","noadkoko","noeunoeuf","nosferalto","nosferapti","onix","ortide","ossatueur","osselait","otaria","papilusion","paras","parasect","persian","piafabec","pikachu","poissirene","poissoroy","ponyta","porygon","psykokwak","ptera","ptitard","pyroli","racaillou","rafflesia","raichu","ramoloss","rapasdepic","rattata","rattatac","reptincel","rhinocorne","rhinoferos","rondoudou","ronflex","roucarnage","roucool","roucoups","sabelette","sablaireau","salameche","saquedeneu","scarabrute","smogo","smogogo","soporifik","spectrum","stari","staross","sulfura","tadmorv","tartard","taupiqueur","tauros","tentacool","tentacruel","tetarte","tortank","triopikeur","tygnon","voltali","voltorbe"];
var valider = document.getElementById("valider");
var start = document.getElementById("start");
var restart = document.getElementById("restart");

var pokemon;
var pokeCache;
var essais;
var listeLettre = [];

informacion.addEventListener("click", showInfos);
entiendo.addEventListener("click", hideInfos);
valider.addEventListener("click", testLettre);
start.addEventListener("click", startGame);
restart.addEventListener("click", restartGame);

gameRules.style.display = "none";
affichageErr.style.display = "none";

function showInfos(){
    gameRules.style.display = "block";
}

function hideInfos(){
    gameRules.style.display = "none";
}

function startGame(){
    affichageMot.innerHTML = "";
    affichageErr.innerHTML = "";
    affichageLettre.innerHTML = "";
    affichageErr.style.display = "none";
    essais = "10";
    affichageScore.innerHTML = essais + " chances restantes";
    document.getElementById("inputLettre").value = "";
    listeLettre = [];
    
    pokemon = pokeChoice();
    pokeCache = "-".repeat(pokemon.length);

    affichageMot.innerHTML = pokeCache;
    console.log(pokemon);
}

function restartGame(){
    affichageMot.innerHTML = "";
    affichageErr.innerHTML = "";
    affichageLettre.innerHTML = "";
    affichageErr.style.display = "none";
    affichageScore.innerHTML = "";
    essais = "10";
    pokemon = "";
    listeLettre = [];
    document.getElementById("inputLettre").value = "";
}

function testLettre(){
    lettre = document.getElementById("inputLettre").value;
    affichageErr.innerHTML = "";
    affichageErr.style.display = "none";

    if(gameover() == true){
        affichageErr.style.display = "flex";
        affichageErr.innerHTML = "C'est bon tranquille, tu peux arrêter c'est fini déjà.";
        document.getElementById("inputLettre").value = "";
        return;
    }
    else if(pokemon == ""){
        affichageErr.style.display = "flex";
        affichageErr.innerHTML = "Mais pourquoi ? T'as même pas lancé une partie.";
        document.getElementById("inputLettre").value = "";
        return;
    }
    else if(!lettre){
        affichageErr.style.display = "flex";
        affichageErr.innerHTML = "Réfléchis, il faut au moins une lettre pour essayer !";
        document.getElementById("inputLettre").value = "";
        return;
    }
    else if(lettre.length > 1){
        affichageErr.style.display = "flex";
        affichageErr.innerHTML = "Une seule lettre espèce de gros tricheur !";
        document.getElementById("inputLettre").value = "";
        return;
    }
    else if(listeLettre.includes(lettre)){
        affichageErr.style.display = "flex";
        affichageErr.innerHTML = "Un peu de sérieux ! Tu l'as déjà jouée cette lettre !";
        document.getElementById("inputLettre").value = "";
        return;
    }
    else{
        listeLettre.push(lettre);
        var nouveauMotCache = "";

        if(pokemon.includes(lettre)){
            for (let i = 0; i < pokemon.length; i++) {
                if (pokemon[i] === lettre) {
                    nouveauMotCache += lettre;
                } else {
                    nouveauMotCache += pokeCache[i];
                }
            }

            pokeCache = nouveauMotCache;
            affichageMot.innerHTML = pokeCache;
            affichageScore.innerHTML = essais + "  chances restantes";
            affichageLettre.innerHTML = listeLettre.join(" ");
        }
        else{
            essais--;
            affichageScore.innerHTML = essais + "  chances restantes";
            affichageLettre.innerHTML = listeLettre.join(" ");
        }

        if(essais == 0){
            pokeCache = pokemon;
            affichageMot.innerHTML = "Perdu ! La réponse était : " + pokemon;
            affichageLettre.innerHTML = "Lettres jouées : " + listeLettre.join(" ");
            return;
        }

        if(gameover() == true){
            affichageMot.innerHTML = "Bien joué ! La réponse était : " + pokemon;
            affichageLettre.innerHTML = "Lettres jouées : " + listeLettre.join(" ");
        }
    }
    // Vide le champ input après validation
    document.getElementById("inputLettre").value = "";
}

function pokeChoice() {
    var index = Math.floor(Math.random() * pokeList.length);
    return pokeList[index];
}

function gameover(){
    if(pokemon == pokeCache){
        return true;
    }
    else{
        return false;
    }
}