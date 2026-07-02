export const environments ={
    apiUrl:process.env.NEXT_PUBLIC_AMBIENCE=="PROD"? process.env.NEXT_PUBLIC_PROD_API_URL:process.env.NEXT_PUBLIC_DEV_API_URL,
    theme:process.env.NEXT_PUBLIC_DEFAULT_THEME
}