export type ApiResponse<T> ={
    message: string
    data: T
}

export type PageableResponse<T> ={
    message?:string,
    data:T,
    page:number,
    pageSize:number,
    totalCount:number,
    totalPages:number,
    hasNextPage:boolean,
    hasPreviousPage:boolean

}