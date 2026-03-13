<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\License;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class LicenseController extends Controller
{
    public function index()
    {
        $licenses = License::orderBy('sort_order')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/Licenses/Index', [
            'licenses' => $licenses
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:5120',
        ]);

        $path = $request->file('image')->store('licenses', 'public');

        License::create([
            'title' => $request->title,
            'image_path' => '/storage/' . $path,
            'sort_order' => License::max('sort_order') + 1,
        ]);

        return redirect()->route('admin.licenses.index')->with('success', 'Лицензия добавлена');
    }

    public function destroy(License $license)
    {
        $relativePath = str_replace('/storage/', '', $license->image_path);
        if (Storage::disk('public')->exists($relativePath)) {
            Storage::disk('public')->delete($relativePath);
        }
        
        $license->delete();
        return redirect()->route('admin.licenses.index')->with('success', 'Лицензия удалена');
    }
}
