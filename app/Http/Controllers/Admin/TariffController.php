<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tariff;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TariffController extends Controller
{
    public function index()
    {
        $tariffs = Tariff::orderBy('sort_order')->get();
        return Inertia::render('Admin/Tariffs/Index', [
            'tariffs' => $tariffs
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Tariffs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if (!isset($validated['sort_order'])) {
            $validated['sort_order'] = Tariff::max('sort_order') + 1;
        }
        if (!isset($validated['is_active'])) {
            $validated['is_active'] = true;
        }

        Tariff::create($validated);

        return redirect()->route('admin.tariffs.index')->with('success', 'Тариф успешно добавлен');
    }

    public function edit(Tariff $tariff)
    {
        return Inertia::render('Admin/Tariffs/Edit', [
            'tariff' => $tariff
        ]);
    }

    public function update(Request $request, Tariff $tariff)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ]);

        $tariff->update($validated);

        return redirect()->route('admin.tariffs.index')->with('success', 'Тариф успешно обновлен');
    }

    public function destroy(Tariff $tariff)
    {
        $tariff->delete();
        return redirect()->route('admin.tariffs.index')->with('success', 'Тариф удален');
    }
}
