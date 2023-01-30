<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Destination;
use App\Category;
use App\Destination_category;

class DestinationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();
        return view('create',['categories'=>$categories]);
        
    }

    public function destinationView()
    {
        $destinations = Destination::paginate(10);
        return view('destinations',['destinations'=>$destinations]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request)
    {
        $validate = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'description' => 'required',
            'categories' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'latitude' => 'required',
            'longitude' => 'required'
            
        ]);

        //return $request->get('categories');
        //return $request;

        $destImgName = $request->input('name');
        $destImgName = str_replace(' ','-', $destImgName);

        if($request->hasFile('image'))
        {
            
            $image = $request->file('image');
            $imageName = $destImgName.time().'.'.$image->getClientOriginalExtension(); // '_'.rand(111, 999).
            $destinationPath = public_path('/images/destination_images');
            $image->move($destinationPath, $imageName);
        }        


        $destination = new Destination;
        $destination->name = $request->input('name');
        $destination->description = $request->input('description');
        $destination->address = $request->input('address'); 
        //aika vierailla
        //kulkeminen
        $destination->longitude = $request->input('longitude'); 
        $destination->latitude = $request->input('latitude'); 
        $destination->imageid = $imageName;
        $saved = $destination->save();

        if(!$saved){
            return back()->with('error','Failed');
        }

        $destId = $destination->id;

        $categories =  $request->get('categories');
        foreach($categories as $category){
            $dest_category = new Destination_category;
            $dest_category->destination_id = $destId;
            $dest_category->category_id = $category;
            $dest_category->save();
        }

        return back()->with('success','Sijainti lisätty');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Destination::with('categories')->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $destination = Destination::find($id);
        return view('edit',['destination'=>$destination]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $destination = Destination::find($id);
        $file_path = public_path().'/images/destination_images/'.$destination->imageid;
        $categories = Destination_category::where('destination_id', $id)->get();
        //$destination;
        unlink($file_path);

        foreach($categories as $category)
        {
            $category->delete();
        }

        $destination->delete();


        return back()->with('success','Sijainti poistettu');
    }
}
