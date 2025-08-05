<?php

namespace App\Http\Requests;

use App\Enums\BranchListField;
use App\Enums\SortEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class BranchListRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'text' => 'nullable',
            'for' => ['nullable', new Enum(BranchListField::class)],
            'sort' => ['nullable', new Enum(SortEnum::class)]
        ];
    }
}
