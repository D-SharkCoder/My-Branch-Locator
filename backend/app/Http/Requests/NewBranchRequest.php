<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewBranchRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', 'regex:/^[A-Za-z ]+$/'],
            'manager' => ['required', 'string', 'max:255', 'regex:/^[A-Za-z ]+$/'],
            'phone'   => ['required', 'string', 'max:20', 'regex:/^\+?[0-9]+$/'],
            'address' => ['required', 'string', 'max:255'],
            'lat'     => ['required', 'numeric'],
            'lng'     => ['required', 'numeric'],
            'status'  => ['required', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.regex' => 'The name may only contain letters and spaces.',
            'manager.regex' => 'The manager name may only contain letters and spaces.',
            'phone.regex' => 'The phone number may only contain digits and an optional leading plus sign.',
            'lat.numeric' => 'Latitude must be a valid number.',
            'lng.numeric' => 'Longitude must be a valid number.',
            'status.boolean' => 'Status must be true or false.',
        ];
    }
}
