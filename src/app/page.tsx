"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
export default function Home() {

  const { data: session } = authClient.useSession() 
  const [email,setEmail] =useState("");
  const [name,setName] =useState("");
  const [password,setPassword] =useState("");

  const onSubmit=()=>{
    authClient.signUp.email({
      email,
      name,
      password,
    },{
      onError:()=>{
        window.alert("something went wrong");
      },
      onSuccess:()=>{
        window.alert("Success");
      }
    });
  }

  const onLogin=()=>{
    authClient.signIn.email({
      email,
      password,
    },{
      onError:()=>{
        window.alert("something went wrong");
      },
      onSuccess:()=>{
        window.alert("Success");
      }
    });
  }

  if (session){
    return(
      <div className="p-4 flex flex-col gap-y-4">
        <p>
          logged in as {session.user.name}
        </p>
        <Button onClick={()=>{authClient.signOut()}}>
          Sign Out
        </Button>
      </div>
    )
  }

  return (

  <div className="p-4 gap-y-4 flex flex-col">
    <div className="p-4 gap-y-4 flex flex-col">
      <Input placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
      <Input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <Input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>  
      <Button onClick={onSubmit}>
          Click me!
      </Button>
    </div>
    <div className="p-4 gap-y-4 flex flex-col">
      <Input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <Input placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>  
    <Button onClick={onLogin}>
          Login
    </Button>
    </div>
  </div>
  );
}
