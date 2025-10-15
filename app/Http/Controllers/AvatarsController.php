<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Avatar;
use Illuminate\Support\Facades\Http;
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
            $avatar = Avatar::with('category')
            ->where('id', $avatarId)->first();

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

    public function getDidAvatar(Request $request)
    {
        try {
            // You can receive the agent_id as a query param or hardcode for now
            $agentId = $request->query('agent_id', 'v2_agt_PFwLeX4t');
    
            $url = "https://api.d-id.com/agents/{$agentId}";
    
            // Make the request to D-ID API using Laravel's HTTP client
            $response = Http::withHeaders([
                'Authorization' => 'Basic ' . base64_encode(env('DID_API_KEY') . ':'),
            ])->get($url);
    
            if ($response->failed()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to fetch D-ID avatar',
                    'error' => $response->body(),
                ], $response->status());
            }
    
            return response()->json([
                'success' => true,
                'data' => $response->json(),
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error connecting to D-ID',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
}
