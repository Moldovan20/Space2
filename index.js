window.addEventListener('load',function()
{

    let persons = [];

    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width = 800;
    const canvasHeight = canvas.height = 800;
    
    
    const bandit1Image = document.getElementById("bandit1");
    const bandit2Image = document.getElementById("bandit2");
    const bandit3Image = document.getElementById("bandit3");

    const police1Image = document.getElementById("police1");
    const police2Image = document.getElementById("police2");
    const police3Image = document.getElementById("police3");

    const lawyer1Image = document.getElementById("lawyer1");
    const lawyer2Image = document.getElementById("lawyer2");
    const lawyer3Image = document.getElementById("lawyer3");

    const handcuffsImage = document.getElementById("handcuffs");
    const lawImage = document.getElementById("law");
    const moneyImage = document.getElementById("money");

    let score = 0;
    let moveOnce = false;
    let index = 0;

    function handlePersons()
    {
        let position = 1;
        
        while(persons.length < 120)
        {
            
            let a = Math.random()*3;
            position++;
        
            if(a > 0 && a <= 1)
            {
                let c = Math.random()*3;

                if(c < 1)persons.push(new Person(canvasWidth, bandit1Image, 100*position, "bandit"));
                else if(c > 2)persons.push(new Person(canvasWidth, bandit3Image, 100*position, "bandit"));  
                else if(c > 1)persons.push(new Person(canvasWidth, bandit2Image, 100*position, "bandit")); 
            }
            if(a > 1 && a <= 2)
            {
                let c = Math.random()*3;

                if(c < 1)persons.push(new Person(canvasWidth, police1Image, 100*position, "police"));
                else if(c > 2)persons.push(new Person(canvasWidth, police3Image, 100*position, "police"));  
                else if(c > 1)persons.push(new Person(canvasWidth, police2Image, 100*position, "police")); 

            }
            else if(a > 2 && a <= 3)
            {
                let c = Math.random()*3;

                if(c < 1)persons.push(new Person(canvasWidth, lawyer1Image, 100*position, "lawyer"));
                else if(c > 2)persons.push(new Person(canvasWidth, lawyer3Image, 100*position, "lawyer"));  
                else if(c > 1)persons.push(new Person(canvasWidth, lawyer2Image, 100*position, "lawyer")); 

            }
            
        }
        
        persons.forEach(person => {
            person.draw(ctx);
        });
        
        if(!moveOnce)
        {
            persons.forEach(person =>{
                person.move();
            });
            moveOnce = true;
        }       
    }
     
    function animate()
    {
        
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        ctx.drawImage(lawImage, 0, 0, canvasWidth, canvasHeight,0, canvasHeight-180, 256, 256);

        ctx.drawImage(handcuffsImage, 0, 0, canvasWidth, canvasHeight,canvasWidth-200, canvasHeight-180, 256, 256);

        ctx.drawImage(moneyImage, 0, 0, canvasWidth, canvasHeight,300, canvasHeight-180, 256, 256);
              
        handlePersons();
        document.addEventListener('keyup', event => {
            if (event.key === 'ArrowLeft')
            {
                persons[index].update("left");
                moveOnce = false;
                
            } else if (event.key === 'ArrowRight') 
            {
                
                persons[index].update("right");
                moveOnce = false;
                
            }
            else if(event.key === 'ArrowDown')
            {
                persons[index].update("down");
                moveOnce = false;
            }

          });

          const directionMoney =  persons[index].getY() > canvasHeight;
          
          
          const directionLaw = persons[index].getX() < 0;
          
          const directionHandcuffs = persons[index].getX() > canvasWidth;
            
            //////////////////////////////////direction Law//////////////////////
        if(directionLaw && persons[index].getpersonCategory() === "lawyer")
        {  
            score += 50;
            index++; 
        }
        else if(directionLaw && persons[index].getpersonCategory() !== "lawyer")
        {  
            score -= 50;
            index++;       
        }
       
        //////////////////////////////////////direction money////////////////////
        if(directionMoney && persons[index].getpersonCategory() === "bandit")
        {  
            score += 50;
            index++; 
        }
        else if(directionMoney && persons[index].getpersonCategory() !== "bandit")
        {  
            score -= 50;
            index++;       
        }
        //////////////////////////////////direction handcuffs////////////////////
        if(directionHandcuffs && persons[index].getpersonCategory() === "police")
        {  
            score += 50;
            index++; 
        }
        else if(directionHandcuffs && persons[index].getpersonCategory() !== "police")
        {  
            score -= 50;
            index++;       
        }

        if(score < 0)score = 0;
               
        ctx.font = "30px Comic Sans MS";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.textAlign = "center";
        ctx.fillText("Score : "+score, 100, 50);
        requestAnimationFrame(animate);
    }
  
     animate();  
   
});