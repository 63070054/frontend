import { useEffect, useState } from "react"
import axios from "axios"

interface ImageIngredientProp {
    name: string,
}

export default function ImageIngredient({ name }: ImageIngredientProp) {

    const [imageIngredient, setImageIngredient] = useState<string>("https://media.tenor.com/zecVkmevzcIAAAAC/please-wait.gif")
    const [ingredientName, setIngredientName] = useState<string>(name)

    useEffect(() => {
        if (ingredientName != "") {
            axios.get("http://localhost:8080/image/ingredient/" + ingredientName).then(result => {
                console.log(result)
                setImageIngredient(result.data)
            })
        }
    }, [])

    return (
        <img className="image-ingredient" alt="" src={imageIngredient} />
    )

}