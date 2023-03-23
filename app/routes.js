const routes = [
    {
        method:'GET',
        path:'/',
        handler: ()=>{
            return 'Welcome Page'
        }
    },
    {
        method:'*',
        path:'/',
        handler: ()=>{
            return 'Forbidden Access Method'
        }
    }
]
module.exports = routes