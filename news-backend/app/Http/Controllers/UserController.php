<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'unique:users',
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response($validator->errors()->first(), 400);
        }
        //validate request

        $user = new User();

        $user->name = $request['name'];
        $user->email = $request['email'];
        $user->api_token = Str::random(60);
        $user->save();

        return response()->json()->setStatusCode($user->id ? 200 : 401);
    }
}
