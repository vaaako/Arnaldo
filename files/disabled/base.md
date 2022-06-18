# ROADMAP
# **- RP DO ARNALDO -** 

## **IDEIA BASE**
```
Sistema de casamento
Você casa depois pode ter anões ou crianças, você ganha dinheiro com elas, bota elas pra cortar cana, roubar, fazer de aviãozinho (anões podem ser no lugar dos filhos, tem que ter anão)
Criança, anão, adolescente fumante, e-girl, careca
Sistema de escravidão
Loja de escravos
Puteiro - poder engravidar a puta
Sistema de trair esposa com pensão, ou matar a esposa ou paga pensão
Sistema de gênero, aonde alguns tem mais privilégios que os outros
Sistema de mendigo
Você perde tudo nas apostas e vira um mendigo
As pessoas podem te espancar, o que é o correto a se fazer, lógico
```

# **ARMAZENAMENTO**

### **JSON** (Descartado)
```json
{
  "ID": { // ID do Discord
    "Nome": "Jorge pica seca",
    "Genero": "Macho", // Muie
    "Disease": "Vitiligo", // Aleatório
    "Conjuge": "Solteiro(a)",
    "RR": 3.90 // Regalias do Renato (dinheiro)
    // Raridade
  },
  "Filhos": {
    "Crianca": 20,
    "Anao": 13,
    "Adolescente_Fumante": 10,
    "E-Girl": 7,
    "Careca": 3
    }
  }
}
```

### Store items
```json
{
 "id": {
  "arma": 0,
  "djamba": 0,
  "galo": { // Pretendo fazer apenas com 3 raças, no máximo 4 (raças ainda não decididas)
    "raca1": 0,
    "raca2": 0,
    "raca3": 0,
  },
  "viagra": 0,
  "whey": 0
},
```

&nbsp;
## **SQL**
### Creating table
```sql
CREATE TABLE "world" (
  "id"  VARCHAR(20),
  "name"  VARCHAR(30),
  "age" VARCHAR(2),
  "gender"  VARCHAR(5),
  "motivation"  VARCHAR(50),
  "disease" VARCHAR(30),
  "rarity"  VARCHAR(10),
  "marriage"  VARCHAR(20),
  "rr"  REAL(4) DEFAULT 0.00,
  "mendigo" INTEGER DEFAULT -1,
  "judeu" INTEGER DEFAULT 0,
  "ado_fum" INTEGER DEFAULT 0,
  "chines"  INTEGER DEFAULT 0,
  "anao"  INTEGER DEFAULT 0,
  "egirl" INTEGER DEFAULT 0,
  "venezuelano" INTEGER DEFAULT 0
);
```

&nbsp;  
### Informações do player
```sql
INSERT INTO world (
  "id", 
  "name", 
  "age", 
  "gender", 
  "motivation", 
  "disease", 
  "rarity", 
  "marriage"
) VALUES (
  '123', 
  'Jorge Pica Seca', 
  '28', 
  'Muie', 
  'Matar Zé pica molhada', 
  'Vitiligo', 
  'Mítico', 
  'Solteiro(a)'
  );
```

&nbsp;  
### Crianças
```sql
UPDATE "world"
    SET "crianca" = 20
        WHERE id = "123";
```

&nbsp;  
### Casar
```sql
UPDATE "world" 
    SET conjuge = CASE id 
        WHEN 'marido' THEN 'esposa' 
        WHEN 'esposa' THEN 'marido' 
    END 
WHERE id IN ('esposa', 'marido');
```

&nbsp;  
# **CARACTERÍSTICAS**
## **RAÇAS**
```json
{
  "judeu": 30,
  "ado_fum": 23,
  "chines": 17,
  "anao": 15,
  "egirl": 10,
  "venezuelano": 5
}
```

## **DINHEIRO POR FILHO**
```json
{
  "judeu": 0.25,
  "ado_fum": 0.50,
  "chines": 1.00,
  "anao": 1.50,
  "egirl": 2.00,
  "venezuelano": 5.00
}
```

## **DOENÇAS**
```json
{
  // Normal não possui característica
  "Normal": [
    "Saudável"
  ],
  "Raro": [ // 20
    "Rubéola",
    "Variola",
    "Caxumba",
    "Diabetes",
    "Daltonismo",
    "Conjuntivite",

    "Feminista",
    "Nazista",
    "Judeu",
    "Gay"
  ],
  "Mítico": [ // 15
    "Lepra",
    "Autismo",
    "Vitiligo",
    "Peste negra",
    "Leptospirose",
    "Esquizofrenia",
    "Síndrome de down",

    "Pedófilo",
    "Necrófilo"
  ],
  "Lendário": [ // 5
    "AIDS",
    "Câncer de próstota",
    "Dupla personalidade"
  ]
}

```
> Ajeitar isso depois pra versão final do README
# **MECÂNICAS**
### **CASAMENTO**
Quando casado tem opção de matar (apagar o personagem) do seu parceiro (por isso a pessoa precisa saber bem com quem está se casando) e receber todas as suas Regalias do Renato
Casamento faz com que na hora de ter um filho venha gêmeos

### **AIDS**
Toda vez que for fazer um filho possui x% de chances de morrer e x% de chances de passar AIDS (caso esteja casado) isso substitui a doença de quem recebe AIDS

### **PUTEIRO**
Local aonde se tem filhos sem precisar se casar
O filho só vai nascer se a camisinha estourar (50% de chances)

### **FILHOS**
Filhos são o que dão Regalias do Renato (não me pergunte o que o Renato faz com seus filhos)

### **MENDIGO**
Ao chegar em uma certa quantidade de reliquias você passa a ser mendigo, você deixa de ser mendigo ao sair dessa quantia
Sendo mendigo os outros player podem te espancar de uma em uma hora, ao chegar em 10 espancamentos o jogador de mendigo morre, sendo assim o jogar possuí no mínimo 10 horas para deixar de ser mendigo

&nbsp;  

# **TO DO**

<!-- ```md -->
x Decidir se vou usar JSON ou SQLITE3  
x Organizar Database  
x Sistema de casamento  
x Sistema de ter filhos  
x Raça de filhos  
x Puteiro  
x Poder ter filho com esposa  
x Divorcio  
x AIDS  
x Matar esposa  
x Pagar  
x Apostar no bicho  
x Daily (Botar criança pra trabalhar)  
x Pensão  
x Mendigo  
x Espancar  
x Mensagens aleatórias para: coisar, puteiro, trabaia  

&nbsp;  


## COMANDOS QUE NÃO ESTÃO FUNCIONANDO

X Perfil  
X Espancar (Bug de travar o bot quando alguém que está com perfil tenta usar)  
X Start (Bug quando não coloca motivação ou nome)  
X Divorcio (Bug que deixa nulo marriage e dinheiro, menos dos parceiros)  
X Talvez - Filhos sumindo (?)   
X Coisar não dando filho  
x Cooldown do puteiro não termina, não pra todos, até agora só pra um usuário
x Quando se suicida o cooldown continua  

&nbsp;  


## IDEIAS ADICIONAIS

X Suicidio   
X Dar (dar dinheiro sem ter que acessar a database diretamente)  
x Quando formar um casal de mesmo sexo os dois mudam a doença para gay  
x Quem tem a doença de gay só pode casar com outro gay
x Djamba ter 10% de dar câncer de pulmão  
x Pinga ter 10% de dar cirrose  
x Pedófilo só pode se casar com menor de idade
x Ao usar o comando carro com pinga no inventário tem 10% de chances da polícia levar o carro com uma multa ou morrer em um acidente
x Categorias no help (-help <categoria>)  
- Arnaldo com um galo super forte como boss


### TRABALHO FIXO (TALVEZ)
Só uma ideia base
0-100 = Ajudante de pedreiro
101-250 = Pedreiro
251-500 = Tele Marketing
501-750 = Professor 
751 - 1000 = Prostituição
1001 - 2000 = Político
2001 - 4000 = Youtuber de Sucesso

Conforme aumenta o ganho também aumenta o tempo de trabalho, pensar em mais coisas quando for fazer isso

&nbsp;  

### GALO OF DUTY

### IDEIA
Três ou quatro raças de galo  
Cada raça terá vantagem em determinado atríbuto  
Pode escolher a raça do galo (status escolhidos aleatóriamente em um range de 5, junto ao atributo de cada raça)
  - [Índio Gigante](https://cdn.discordapp.com/attachments/890730539919761488/939264074301194280/images_6.jpeg)  (+2 HP)
  - [Galinha Dangola vulgo Tô fraca](https://cdn.discordapp.com/attachments/890730539919761488/939283532243693638/images_11.jpeg)  (+2 DEF)
  - [Garnisé/Galizé vulgo galo rebaixado](https://cdn.discordapp.com/attachments/890730539919761488/939264394175610890/images_8.jpeg)  (+1 ATK, +1 SPD)
  - [Sedosa](https://cdn.discordapp.com/attachments/890730539919761488/939264965922140190/images_9.jpeg) (+1 HP, +1 SPD)
  - [Galo Sniper](https://cdn.discordapp.com/attachments/894657350831595560/942175834909855794/images_5.jpeg) (Maiores chances de crítico)
  - [G.A.L.O - Galinha Automatizada Liquitificadora de Oponentes](https://cdn.discordapp.com/attachments/894657350831595560/942177496256897094/images_6.jpeg) (+2 ATK)
  - [The Cock](https://cdn.discordapp.com/attachments/894657350831595560/942182076545921064/images_7.jpeg) (+1 HP, +1 DEF)
  - [SPY](FOTO DE AVESTRUZ) (+2 SPD)

Para lutar precisa apostar um valor mínimo de 20 regalias

### ATRIBUTOS
- Vida
- Ataque
- Defesa
- Speed

### COMO VAI FUNCIONAR
- Força é o dano causado à vida
- Defesa é o que vai evitar parte do dano
- Decide quem começa atacando

resultado = Math.abs(defesa-força)-vida
  - Função que passa valor negativo para positivo. Ex. -132 -> 132

Repetir processo de dano até algum galo morrer

### MECÂNICAS
O dono pode treinar o galo 
  - timeout de 12 horas  
A cada treino sobe +1 status aleátorio do galo e ele sobe de nível

### JSON
```json
"galo": {
  "name": "Antônio",
  "race": "Galo Sniper",
  "level": 1,
  "hp": 5,
  "attack": 2,
  "defense": 3,
  "speed": 3
}
```

&nbsp;  

## LOJA

X Arma (30% de matar alguém, uma bala, RR$500)  
x Chicote (Aumenta velocidade de trablaho, Tupai Tupei)  
x Djamba (Djamba)  
x Galo (Rinha)  
x Pinga (Cirrose)  
X Viagra (Dobro de filhos no puteiro)  
x Whey (Dobro do valor em trabalho)  
<!-- ``` -->