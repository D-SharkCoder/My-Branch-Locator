<?php

namespace App\Http\Controllers;

use App\Http\Requests\BranchListRequest;
use App\Http\Requests\NewBranchRequest;
use App\Http\Requests\UpdateBranchRequest;
use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BranchController extends Controller
{
    public function index(BranchListRequest $request)
    {
        $text = $request->input('text') ?? null;
        $for = $request->input('for') ?? null;
        $sort = $request->input('sort') ?? null;
        
        return Branch::when($text && $for == 'any', function ($query) use ($text) {
            $query->where("name", 'LIKE', "%${text}%")
            ->orWhere("manager", "LIKE", "%${text}%")
            ->orWhere("phone", "LIKE", "%${text}%")
            ->orWhere("address", "LIKE", "%${text}%");
        })
        ->when($text && $for != 'any', function ($query) use ($for, $text) {
            $query->where($for, 'LIKE', "%${text}%");
        })
        ->when(in_array($sort, ['asc', 'desc']), function ($query) use ($sort) {
            $query->orderBy('name', $sort);
        })
        ->get();
    }

    public function store(NewBranchRequest $request)
    {
        $branch = Branch::create($request->validated());

        return response()->json($branch, Response::HTTP_CREATED);
    }

    public function show(Branch $branch)
    {
        return $branch;
    }

    public function update(UpdateBranchRequest $request, Branch $branch)
    {
        $branch->update($request->validated());

        return response()->json($branch);
    }

    public function destroy(Branch $branch)
    {
        $branch->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
