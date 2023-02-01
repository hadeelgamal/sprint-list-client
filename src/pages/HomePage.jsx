import { Link } from "react-router-dom";

function HomePage() {
    return (
      <div>
        <section className="py-24 flex items-center min-h-screen justify-center bg-white" >
            <div className="mx-auto max-w-[43rem]">
          <div className="text-center">
            <p className="text-lg font-medium leading-8 text-green-600/95">Introducing Sprint List App</p>
            <h1 className="mt-3 text-[3.5rem] font-bold leading-[4rem] tracking-tight text-black">Transform your tasks from&nbsp;thoughts to action</h1>
            <p className="mt-3 text-lg leading-relaxed text-slate-400">Sprint List helps you keep track of all your tasks in one place. Sign up and start creating sprints filled with your next To-do list.</p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
          <Link to="/signup"> <button className="transform rounded-md bg-green-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-green-700">Sign Up</button> </Link>
              <Link to="/login"> <button className="transform rounded-md border border-slate-200 px-5 py-3 font-medium text-slate-900 transition-colors hover:bg-slate-50">Login</button> </Link>
                
          </div>
        </div>
</section>
       
       
        
           
      </div>
    );
  }
   
  export default HomePage;