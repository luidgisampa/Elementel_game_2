// ---> variaveis de objetos <---
// Personagem e Enimigos
var Player_obj, Attack_obj, Crystal_obj
var Enemy01_obj, Enemy02_obj;
var Shadow_obj;
// Cenario
var BackGround_obj, Portal01_obj, Portal02_obj, Portal03_obj, Tree01_obj, Tree02_obj, Tree03_obj, foliage_obj;

// ---> variaveis de sprite <---
// variaveis de sprite do player / ataque / cristal.
var PlayerNormal01_spr, PlayerNormal02_spr, PlayerAttackN_spr;
var PlayerHoly_spr, PlayerAttackH01_spr,PlayerAttackH02_spr, HolyCrystal_spr;
var PlayerCursed_spr, PlayerAttackC01_spr, PlayerAttackC02_spr, CursedCrystal_spr;
var PlayerAcid_spr, PlayerAttackA01_spr, PlayerAttackA02_spr, AcidCrystal_spr;
var PlayerWood_spr, PlayerAttackW01_spr, PlayerAttackW02_spr, WoodCrystal_spr;
// variavies de inimigo 
var Enemy01_spr, Enemy02_spr
var EnemyHit01_spr, EnemyHit02_spr
// variavies de cenario.
var BackGround_spr, Portal01_spr, Portal02_03_spr, Tree01_spr, Tree02_spr, Tree03_spr, foliage_spr;
// variavel de sprite da sombra.
var Shadow_spr;

// ---> variaveis adicionais <---
var Player_status = "normal"
var Crystal_status = 0
var Spawned_enemys = 2
var Wave_status = 1
var direction = true
var Time = true

var Crystal_group, Attack_group;
var Enemy01_group, Enemy02_group;

function preload() {
    // ---> carregando sprites de ataques <---
    PlayerAttackN_spr = loadAnimation("HolyInitial1.png");
    PlayerAttackH_spr = loadAnimation("holy.gif");
    PlayerAttackC_spr = loadAnimation("Dark.gif");
    PlayerAttackA_spr = loadAnimation("Acid.gif");
    PlayerAttackW_spr = loadAnimation("Wood.gif");
    
    // ---> carregando sprites de personagem <---
    PlayerNormal01_spr = loadImage("PlayerNormal_sprite.png");
    PlayerNormal02_spr = loadImage("PlayerNormal_sprite2.png");
    PlayerHoly01_spr = loadImage("PlayerHoly_sprite.png");
    PlayerHoly02_spr = loadImage("PlayerHoly_sprite2.png");
    PlayerCursed01_spr = loadImage("PlayerCursed_sprite.png");
    PlayerCursed02_spr = loadImage("PlayerCursed_sprite2.png");
    PlayerAcid01_spr = loadImage("PlayerAcid_sprite.png");
    PlayerAcid02_spr = loadImage("PlayerAcid_sprite2.png");
    PlayerWood01_spr = loadImage("PlayerWood_sprite.png");
    PlayerWood02_spr = loadImage("PlayerWood_sprite2.png");

    // ---> carregando sprites de inimigos <---
    Enemy01_spr = loadAnimation("fly.gif");
    Enemy02_spr = loadAnimation("walk0.gif");

    // ---> carregando sprites de cristais <---
    HolyCrystal_spr = loadImage("Holy_crystal.png");
    CursedCrystal_spr = loadImage("Cursed_crystal.png");
    AcidCrystal_spr = loadImage("Acid_crystal.png");
    WoodCrystal_spr = loadImage("Wood_crystal.png");

    // ---> carregando sprites do cenario <---
    BackGround_spr = loadImage("BackGround.png");
    Portal01_spr = loadImage("Portal_01.png");
    Portal02_spr = loadImage("Portal_02.png");
    Portal03_spr = loadImage("Portal_03.png");
    Shadow_spr = loadImage("Shadow01_sprite.png");
    Tree01_spr = loadImage("Arvore01_sprite.png");
    Tree02_spr = loadImage("Arvore02_sprite.png");
    Tree03_spr = loadImage("Arvore03_sprite.png");
    foliage_spr = loadImage("Foliage01_sprite.png");
}

function setup() {
    // criando a janela
    createCanvas(1700, 1000);
    
    //  ---> criando os objetos <---
    BackGround_obj = createSprite(800,400)
    BackGround_obj.addImage("background1",BackGround_spr);
    BackGround_obj.scale = 4

    Tree03_obj = createSprite(400,470)
    Tree03_obj.addImage("tree03", Tree03_spr);
    Tree03_obj.scale = 5

    Portal01_obj = createSprite(850,600)
    Portal01_obj.addImage("portal01", Portal01_spr);
    Portal01_obj.scale = 2.5

    Portal02_obj = createSprite(100,600)
    Portal02_obj.addImage("portal02", Portal02_spr);
    Portal02_obj.scale = 4

    Portal03_obj = createSprite(1600,600)
    Portal03_obj.addImage("portal02", Portal03_spr);
    Portal03_obj.scale = 4

    Player_obj = createSprite(850, 640)
    Player_obj.addImage("normal_player01", PlayerNormal01_spr);
    Player_obj.addImage("normal_player02", PlayerNormal02_spr);

    Player_obj.addImage("holy_player01", PlayerHoly01_spr);
    Player_obj.addImage("holy_player02", PlayerHoly02_spr);

    Player_obj.addImage("cursed_player01", PlayerCursed01_spr);
    Player_obj.addImage("cursed_player02", PlayerCursed02_spr);

    Player_obj.addImage("acid_player01", PlayerAcid01_spr);
    Player_obj.addImage("acid_player02", PlayerAcid02_spr);

    Player_obj.addImage("wood_player01", PlayerWood01_spr);
    Player_obj.addImage("wood_player02", PlayerWood02_spr);
    Player_obj.scale = 2.5

    Shadow_obj = createSprite(850, 570)
    Shadow_obj.addImage("shadow", Shadow_spr);
    Shadow_obj.scale = 4.5

    Crystal_group = new Group();
    Attack_group = new Group();
    Enemy01_group = new Group();
    Enemy02_group = new Group();
};

function draw() {
    drawSprites();
    createCrystal();
    changePower();
    enemyWave();
    edges = createEdgeSprites();

    Shadow_obj.y = Player_obj.y + 25;
    Shadow_obj.x = Player_obj.x;

    if (keyDown("A")&& Player_obj.x >= 20){
        Player_obj.x -= 5
        direction = true

        if (Player_status == "normal"){ 
            Player_obj.changeAnimation("normal_player01")
        } else if (Player_status == "holy") {
            Player_obj.changeAnimation("holy_player01")
        } else if (Player_status == "cursed") {
            Player_obj.changeAnimation("cursed_player01")
        } else if (Player_status == "wood") {
            Player_obj.changeAnimation("wood_player01")
        } else if (Player_status == "acid") {
            Player_obj.changeAnimation("acid_player01")
        };

    } else if (keyDown("D")&& Player_obj.x <= 1680){
        Player_obj.x += 5;
        direction = false

        if (Player_status == "normal"){ 
            Player_obj.changeAnimation("normal_player02")
        } else if (Player_status == "holy") {
            Player_obj.changeAnimation("holy_player02")
        } else if (Player_status == "cursed") {
            Player_obj.changeAnimation("cursed_player02") 
        } else if (Player_status == "wood") {
            Player_obj.changeAnimation("wood_player02")
        } else if (Player_status == "acid") {
            Player_obj.changeAnimation("acid_player02")
        };
    };
    if (keyDown("E")){
        createPower();
    };

    if (Attack_group.isTouching(Enemy01_group)){
        Enemy01_group.destroyEach()
    }
    if (Attack_group.isTouching(Enemy02_group)){
        Enemy02_group.destroyEach()
    }

    console.log("Status do proximo cristal: ",Crystal_status);
    console.log("Statuts do Player: ",Player_status);
    console.log("Wave: ",Wave_status);
}

function createPower() {
    if(frameCount % 25 == 0) {
        Attack_obj = createSprite(850, 570)
        Attack_obj.addAnimation("normal", PlayerAttackN_spr)
        Attack_obj.addAnimation("holy", PlayerAttackH_spr)
        Attack_obj.addAnimation("cursed", PlayerAttackC_spr)
        Attack_obj.addAnimation("acid", PlayerAttackA_spr)
        Attack_obj.addAnimation("wood", PlayerAttackW_spr)
        Attack_obj.scale = 2

        Attack_group.add(Attack_obj)

        Attack_obj.x = Player_obj.x
        Attack_obj.y = Player_obj.y

        if (direction == true) {
            Attack_obj.velocityX = -15
            Attack_obj.scale = -2
        } else if (direction == false) {
            Attack_obj.velocityX = 15
            Attack_obj.scale = 2
        }

        Attack_obj.lifeTime = 10

        if(Player_status == "normal"){
            Attack_obj.changeAnimation("normal")
        } else if (Player_status == "holy"){
            Attack_obj.changeAnimation("holy")
        } else if (Player_status == "cursed"){
            Attack_obj.changeAnimation("cursed")
        } else if (Player_status == "acid"){
            Attack_obj.changeAnimation("acid")
        } else if (Player_status == "wood"){
            Attack_obj.changeAnimation("wood")
        }
        
    }
}

function createCrystal(){
    if(frameCount % 800 == 0) {
        setInterval(() => {
            var number = int(Math.random()* 5);
            console.log(number);

            Crystal_obj = createSprite(850,650)
            Crystal_obj.addImage("holy", HolyCrystal_spr)
            Crystal_obj.addImage("cursed", CursedCrystal_spr)
            Crystal_obj.addImage("acid", AcidCrystal_spr)
            Crystal_obj.addImage("wood", WoodCrystal_spr)
            Crystal_obj.scale = 2

            if (number == 1) {
                Crystal_obj.changeAnimation("holy")
                Crystal_status = 1
            }else if (number == 2) {
                Crystal_obj.changeAnimation("cursed")
                Crystal_status = 2
            }else if (number == 3) {
                Crystal_obj.changeAnimation("acid")
                Crystal_status = 3
            }else if (number == 4) {
                Crystal_obj.changeAnimation("wood")
                Crystal_status = 4
            }else {
                Crystal_obj.changeAnimation("wood")
                Crystal_status = 4
            };
            Crystal_group.add(Crystal_obj);
        }, 5000);
    }
};

function changePower(){
    if(Player_obj.isTouching(Crystal_group)){
        Crystal_group.destroyEach();

        if (Crystal_status == 1) {
            Player_status = "holy"
            if(frameCount % 800 == 0) {
                if (direction = true){
                    Player_obj.changeAnimation("normal_player01")
                } else {
                    Player_obj.changeAnimation("normal_player02")
                }
                Player_status = "normal"
            }
        } else if (Crystal_status == 2) {
            Player_status = "cursed"
            if(frameCount % 800 == 0) {
                if (direction = true){
                    Player_obj.changeAnimation("normal_player01")
                } else {
                    Player_obj.changeAnimation("normal_player02")
                }
                Player_status = "normal"
            }
        } else if (Crystal_status == 3) {
            Player_status = "acid"
            if(frameCount % 800 == 0) {
                if (direction = true){
                    Player_obj.changeAnimation("normal_player01")
                } else {
                    Player_obj.changeAnimation("normal_player02")
                }
                Player_status = "normal"
            }
        } else if (Crystal_status == 4) {
            Player_status = "wood"
            if(frameCount % 800 == 0) {
                if (direction = true){
                    Player_obj.changeAnimation("normal_player01")
                } else {
                    Player_obj.changeAnimation("normal_player02")
                }
                Player_status = "normal"
            }
        } 

    }
}

function enemyWave(){
    var enemys = int(Math.random()* 3);
    console.log(enemys)

    if (Time){
        createEnemy()
    }
}

function createEnemy(){
    if(frameCount % 75 == 0) {
        Enemy01_obj = createSprite(100,625);
        Enemy01_obj.addAnimation("walk", Enemy01_spr);
        Enemy01_obj.scale = 2;
    
        Enemy01_obj.velocityX += 5
        Enemy01_group.add(Enemy01_obj)
    
        Enemy02_obj = createSprite(1600,625);
        Enemy02_obj.addAnimation("walk", Enemy02_spr);
        Enemy02_obj.scale = 2

        Enemy02_obj.velocityX -= 5
        Enemy02_group.add(Enemy02_obj)
    }
}