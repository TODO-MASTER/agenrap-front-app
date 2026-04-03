export default function AgenrapMenuBar({children}:{children:React.ReactNode}){
    return(
        <menu className="flex gap-x-1">
            {children}
        </menu>
    )
}