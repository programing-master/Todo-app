import { useContext } from "react"
import { FeaturesContext } from "../context/features.context"

export const useFeatures=()=>{
    const context=useContext(FeaturesContext);
    if(!context)throw new Error("Where is the context?");
    return context;
}