console.log("Static js file accessed successfully !")

function fetchDefinition() {
    const textbox = document.getElementById("txtword") 
    const word = textbox.value
    textbox.value = ''
    const url = '/search?word='+word
    console.log(word)
    fetch(url).then((response)=>{
        return response.json()
    }).then((res)=>{
        if(res.error){
            document.getElementById('h3word').innerHTML = res.data.word
        console.log(res.error)
        }else{
            document.getElementById('h3word').innerHTML = res.data.word
            document.getElementById('h3definition').innerHTML = res.data.definition
            console.log(res)
        }
    }).catch((e)=>{
        console.log("Error occured: ",e)
        document.getElementById('h3word').innerHTML = "Error occured: "+e

    })


}