import { useState } from "react"
import LoaderContext from "./loaderContext"
import { useToast } from "@/components/ui/use-toast"


const LoaderState = (props) => {

    const [loader, setLoader] = useState(false)
    const { toast } = useToast()

    const showToast= (title, description, variant = undefined) =>{
        toast({
            variant: variant,
            title: title,
            description: description,
          })
    }

  return (
    <LoaderContext.Provider value={{ loader, setLoader, showToast}}>
    {props.children}
  </LoaderContext.Provider>
  )
}

export default LoaderState
