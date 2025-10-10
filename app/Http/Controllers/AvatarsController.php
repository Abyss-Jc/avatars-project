<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Avatar;

use Exception;

class AvatarsController extends Controller
{
    public function getAvatars() {
        try {
            $avatars = Avatar::with('category')
            ->where('status', 'active')
            ->get();

            return response()->json([
                'avatars' => $avatars
            ]);
        }
        catch(Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error getting avatars',
                'error' => $e->getMessage()
            ]);
        }
    }

    public function getAvatarFrame($avatarId) {
        try {
            $avatar = Avatar::where('id', $avatarId)->first();

            return response()->json([
                'avatar' => $avatar
            ]);
        }
        catch(Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error getting frame',
                'error' => $e->getMessage()
            ]);
        }
    }
}
