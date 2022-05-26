=======
        console.log('Fulllist',fullList)
        fullList.length > 0 && originalIngredients.push('Salt', 'Olive', 'Sugar')
        let result = []
        let valid;
        console.log(originalIngredients)
        fullList.forEach(drink => {
            for (let i = 1; i <= 15; i++) {
                console.log(drink.strDrink)
                console.log(drink[`strIngredient${i}`])   
                console.log(originalIngredients)
                if (drink[`strIngredient${i}`] !== null && !originalIngredients.includes(drink[`strIngredient${i}`])) {
>>>>>>> staging
