<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactRequestController extends Controller
{
    public function index()
    {
        $requests = ContactRequest::orderBy('created_at', 'desc')->get();
        return Inertia::render('Admin/ContactRequests/Index', [
            'requests' => $requests
        ]);
    }

    public function update(Request $request, ContactRequest $contactRequest)
    {
        $validated = $request->validate([
            'status' => 'required|in:new,processed'
        ]);

        $contactRequest->update($validated);
        
        return back()->with('success', 'Статус обновлен');
    }

    public function destroy(ContactRequest $contactRequest)
    {
        $contactRequest->delete();
        return back()->with('success', 'Заявка удалена');
    }
}
