const menu1 = document.getElementById('menu1');
    const left = menu1.querySelector('.left');
    const leftin = menu1.querySelector('.leftin');
    const bottom = menu1.querySelector('.bottom');
    const bottomin = menu1.querySelector('.bottomin');
    const right = menu1.querySelector('.right');
    const rightin = menu1.querySelector('.rightin');

    //hacer funcion que cuando pase el cursor por encima de leftin cambie al tamaño de left
    leftin.addEventListener('mouseover', () => {
        leftin.style.width = '820px';
        leftin.style.height = '300px';
        leftin.style.clipPath = "polygon(0% 0%, 100% 0%, 65% 100%, 0% 100%)";
        leftin.style.borderRadius = '25px';
    });

    leftin.addEventListener('mouseout', () => {
        leftin.style.width='795px';
        leftin.style.height='290px';
        leftin.style.clipPath = "polygon(0% 0%, 100% 0%, 65% 100%, 0% 100%)";

    });

    //hacer funcion que cuando pase el cursor por encima de rightin cambie al tamaño de right
    rightin.addEventListener('mouseover', () => {
        rightin.style.width = '580px';
        rightin.style.height = '610px';
        rightin.style.clipPath = 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 50%)';
        rightin.style.position= "absolute";
        rightin.style.left="1px";
    });

    rightin.addEventListener('mouseout', () => {
        rightin.style.position= "absolute";
        rightin.style.left="10px";
        rightin.style.width='560px';
        rightin.style.height='595px';
        rightin.style.clipPath = 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 50%);';
        
        rightin.stile.borderRadius='25px'
    });

    bottomin.addEventListener('mouseover', () => {
        bottomin.style.width="820px";
        bottomin.style.height="300px";
        bottomin.stile.clipPath="polygon(0% 0%, 65% 0%, 100% 100%, 0% 100%)";

    });
    bottomin.addEventListener('mouseout', () => {
        bottomin.style.width="795px";
        bottomin.style.height="290px";
        bottomin.stile.clipPath="polygon(0% 0%, 65% 0%, 100% 100%, 0% 100%)";
    });