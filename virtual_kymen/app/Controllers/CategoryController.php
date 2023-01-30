<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Destination_category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        //return Post::all();
        return view('category');
        
    }

    public function categoryView()
    {
        $categories = Category::paginate(10);
        return view('categories',['categories'=>$categories]);
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

    public function getCategories()
    {
        return Category::all();
    }

    public function store(Request $request)
    {
        $validate = $request->validate([
            'categoryName' => 'required',
            'category_image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        //$category = Category::where('category_name',$request->input('categoryName'))->first();

        if(!Category::where('category_name',$request->input('categoryName'))->exists()){
            $catImgName = $request->input('name');
            $catImgName = str_replace(' ','-', $catImgName);

            if($request->hasFile('category_image'))
            {
                $image = $request->file('category_image');
                $imageName = $catImgName.time().'.'.$image->getClientOriginalExtension(); // '_'.rand(111, 999).
                $destinationPath = public_path('/images/category_images');
                $image->move($destinationPath, $imageName);
            }        

            $category = new category;
            $category->category_name = $request->input('categoryName');
            $category->category_image = $imageName;
            $saved = $category->save();

            return back()->with('success','Kategoria lisätty');
        }
        else
        {
            return back()->with('fail','Kategoria on jo olemassa');
        }
        

        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        $category = Category::find($id);
        $file_path = public_path().'/images/category_images/'.$category->category_image;
        $categories = Destination_category::where('category_id', $id)->get();
        unlink($file_path);

        foreach($categories as $category)
        {
            $category->delete();
        }

        $category->delete();


        return back()->with('success','Kategoria poistettu');
    }
}
