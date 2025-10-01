"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, TrendingUp, Zap, BookOpen } from 'lucide-react';

export default function AreaCalculator() {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState<'radius' | 'diameter' | 'circumference'>('radius');
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const calculateArea = useCallback(() => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) {
      setResult(null);
      setSteps(['Please enter a valid positive number.']);
      return;
    }

    let area: number;
    let calculationSteps: string[] = [];

    switch (inputType) {
      case 'radius':
        area = Math.PI * value * value;
        calculationSteps = [
          `Given: Radius (r) = ${value}`,
          `Formula: A = πr²`,
          `Step 1: Square the radius`,
          `r² = ${value}² = ${value * value}`,
          `Step 2: Multiply by π`,
          `A = π × ${value * value}`,
          `A = 3.14159... × ${value * value}`,
          `A = ${area.toFixed(4)} square units`
        ];
        break;
      case 'diameter':
        area = Math.PI * (value / 2) * (value / 2);
        calculationSteps = [
          `Given: Diameter (d) = ${value}`,
          `Formula: A = π(d/2)² or A = πd²/4`,
          `Step 1: Find radius = d/2`,
          `r = ${value}/2 = ${value / 2}`,
          `Step 2: Square the radius`,
          `r² = ${value / 2}² = ${(value / 2) * (value / 2)}`,
          `Step 3: Multiply by π`,
          `A = π × ${(value / 2) * (value / 2)}`,
          `A = ${area.toFixed(4)} square units`
        ];
        break;
      case 'circumference':
        area = (value * value) / (4 * Math.PI);
        calculationSteps = [
          `Given: Circumference (C) = ${value}`,
          `Formula: A = C²/(4π)`,
          `Step 1: Square the circumference`,
          `C² = ${value}² = ${value * value}`,
          `Step 2: Divide by 4π`,
          `A = ${value * value}/(4 × π)`,
          `A = ${value * value}/(4 × 3.14159...)`,
          `A = ${value * value}/12.56637...`,
          `A = ${area.toFixed(4)} square units`
        ];
        break;
      default:
        area = 0;
    }

    setResult(area);
    setSteps(calculationSteps);
  }, [inputType, inputValue]);

  useEffect(() => {
    if (inputValue) {
      calculateArea();
    }
  }, [calculateArea, inputValue]);

  return (
    <div className="min-h-screen bg-white">
      {/* Clean Hero Section */}
      <div className="bg-gradient-to-b from-indigo-50 to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Simple Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Area of a Circle Calculator
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Calculate the area of any circle using radius, diameter, or circumference. 
              Free, accurate, and instant results with step-by-step solutions.
            </p>
          </div>

          {/* Clean Calculator Layout */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="grid md:grid-cols-2">
                {/* Left Side - Calculator */}
                <div className="p-8 border-r border-gray-200">
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-900 mb-3">
                      Select Input Type
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['radius', 'diameter', 'circumference'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setInputType(type)}
                          className={`py-2 px-3 rounded-lg font-semibold text-sm transition-all ${
                            inputType === type
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Enter {inputType} value
                    </label>
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter value"
                      className="w-full px-4 py-3 text-lg font-semibold text-gray-900 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                      min="0"
                      step="any"
                    />
                    <p className="text-sm text-gray-700 font-medium mt-2">
                      Use any positive number with optional decimals
                    </p>
                  </div>

                  {result !== null && (
                    <div className="bg-indigo-600 text-white rounded-lg p-4">
                      <p className="text-sm font-medium opacity-90 mb-1">Calculated Area</p>
                      <p className="text-3xl font-bold">{result.toFixed(4)}</p>
                      <p className="text-sm mt-1 opacity-90">square units</p>
                    </div>
                  )}
                </div>

                {/* Right Side - Formula Display */}
                <div className="p-8 bg-gray-50">
                  <h3 className="font-bold text-gray-900 mb-4">Active Formula</h3>
                  <div className="bg-white rounded-lg p-4 border border-gray-200 mb-6">
                    <p className="text-2xl font-mono font-bold text-indigo-600">
                      {inputType === 'radius' ? 'A = πr²' : 
                       inputType === 'diameter' ? 'A = πd²/4' : 
                       'A = C²/(4π)'}
                    </p>
                  </div>

                  {steps.length > 0 && inputValue && (
                    <div>
                      <h4 className="font-bold text-gray-900 mb-3">Calculation Steps</h4>
                      <div className="space-y-2">
                        {steps.slice(0, 4).map((step, index) => (
                          <div key={index} className="text-sm text-gray-800 font-medium">
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="max-w-4xl mx-auto mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <Zap className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-900">Instant Results</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <TrendingUp className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-900">15+ Decimal Precision</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
              <BookOpen className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-900">Step-by-Step Guide</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Formula Cards */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Three Ways to Calculate Circle Area
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-colors">
              <div className="text-3xl font-mono font-bold text-indigo-600 mb-4">A = πr²</div>
              <h3 className="font-bold text-gray-900 mb-2">Using Radius</h3>
              <p className="text-gray-800 font-medium">
                Square the radius and multiply by π. The most common method for finding area.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-colors">
              <div className="text-3xl font-mono font-bold text-indigo-600 mb-4">A = πd²/4</div>
              <h3 className="font-bold text-gray-900 mb-2">Using Diameter</h3>
              <p className="text-gray-800 font-medium">
                Square the diameter, multiply by π, then divide by 4.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-indigo-500 transition-colors">
              <div className="text-3xl font-mono font-bold text-indigo-600 mb-4">A = C²/4π</div>
              <h3 className="font-bold text-gray-900 mb-2">Using Circumference</h3>
              <p className="text-gray-800 font-medium">
                Square the circumference and divide by 4π.
              </p>
            </div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Complete Guide to Finding the Area of a Circle
          </h2>
          
          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Understanding Circle Area</h3>
            <p className="text-gray-800 font-medium leading-relaxed mb-4">
              The <strong className="text-gray-900">area of a circle</strong> represents the total space enclosed within its circumference. 
              Unlike the <a href="https://circumferenceofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">circumference</a> 
              which measures the perimeter, area quantifies the entire two-dimensional surface contained within the circle’s boundary.
            </p>
            <p className="text-gray-800 font-medium leading-relaxed mb-4">
              The formula A = πr² shows how area scales quadratically with radius. This means doubling the radius 
              quadruples the area—a principle that explains why large pizzas offer much better value per square inch 
              than small ones. Understanding this relationship is crucial for applications ranging from architecture 
              to manufacturing.
            </p>
            <p className="text-gray-800 font-medium leading-relaxed">
              To master circle calculations, you should also understand how to find the 
              <a href="https://radiusofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold"> radius</a> from area, 
              or determine the <a href="https://diameterofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">diameter</a> 
              when only area is known. For a deeper understanding of the mathematical principles, visit our 
              <a href="https://circleareaformula.com" className="text-indigo-600 hover:text-indigo-800 font-semibold"> area formula guide</a>.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">The History of π and Circle Area</h3>
          <p className="text-gray-800 font-medium leading-relaxed mb-4">
            Ancient civilizations recognized the constant relationship between a circle’s area and its radius squared. 
            The Babylonians approximated π as 3.125 around 1900 BCE, while ancient Egyptians used 3.16. The Greek 
            mathematician Archimedes (287-212 BCE) proved that the area of a circle equals half its circumference 
            times its radius, establishing the foundation for our modern formula A = πr².
          </p>
          <p className="text-gray-800 font-medium leading-relaxed mb-6">
            Chinese mathematician Liu Hui refined these calculations in 263 CE using a polygon approximation method, 
            achieving π accurate to 3.14159. Today, we can calculate π to trillions of digits, though just 39 digits 
            would suffice to calculate the circumference of the observable universe to within the width of a hydrogen atom.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step Calculation Methods</h3>
          
          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Method 1: Using Radius (Most Common)</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-800 font-medium">
              <li>Identify or measure the radius (distance from center to edge)</li>
              <li>Square the radius by multiplying it by itself (r × r = r²)</li>
              <li>Multiply the result by π (approximately 3.14159)</li>
              <li>The result is your area in square units</li>
            </ol>
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
              <p className="font-mono text-gray-900 font-bold">Example: r = 10 units</p>
              <p className="font-mono text-gray-800">A = π × 10² = 3.14159 × 100 = 314.159 square units</p>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-xl p-6 mb-6">
            <h4 className="font-bold text-gray-900 mb-3 text-lg">Method 2: Using Diameter</h4>
            <p className="text-gray-800 font-medium mb-3">
              When you know the diameter, use A = πd²/4. This is useful for physical measurements where finding 
              the exact center is difficult. Learn more at our 
              <a href="https://howtofindareaofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold"> detailed tutorial page</a>.
            </p>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="font-mono text-gray-900 font-bold">Example: d = 20 units</p>
              <p className="font-mono text-gray-800">A = π × 20²/4 = 3.14159 × 100 = 314.159 square units</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Real-World Applications</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3">Engineering & Construction</h4>
              <p className="text-gray-800 font-medium">
                Engineers calculate cross-sectional areas of pipes, cables, and structural columns using πr². 
                A water pipe with a 10cm radius has a cross-sectional area of 314.16 cm², determining its 
                flow capacity. Understanding these calculations is essential for infrastructure design.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3">Agriculture & Irrigation</h4>
              <p className="text-gray-800 font-medium">
                Center pivot irrigation systems create circular fields. A 400-meter radius system covers 
                50.26 hectares (502,654 m²). Farmers use this to calculate seed quantities, fertilizer needs, 
                and expected yields. Visit our <a href="https://surfaceareaofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">surface area calculator</a> 
                for 3D applications.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Mistakes to Avoid</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <ArrowRight className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Confusing area with circumference:</strong>
                <span className="text-gray-800 font-medium"> Area uses r² (square units) while circumference uses r (linear units). 
                Visit our <a href="https://circumferenceofacircleformula.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">circumference formula guide</a> to 
                understand the difference.</span>
              </div>
            </li>
            <li className="flex items-start">
              <ArrowRight className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Using diameter in radius formula:</strong>
                <span className="text-gray-800 font-medium"> If given diameter, either divide by 2 first or use the formula A = πd²/4.</span>
              </div>
            </li>
            <li className="flex items-start">
              <ArrowRight className="w-5 h-5 text-indigo-600 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <strong className="text-gray-900">Forgetting to square the radius:</strong>
                <span className="text-gray-800 font-medium"> The formula is πr², not πr. This is the most common calculation error.</span>
              </div>
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Concepts</h3>
          <p className="text-gray-800 font-medium leading-relaxed mb-6">
            Understanding circle area leads to more complex calculations. The <a href="https://equationofacircle.com" className="text-indigo-600 hover:text-indigo-800 font-semibold">equation of a circle</a> 
            (x-h)² + (y-k)² = r² connects algebra with geometry. For gaming applications, our 
            <a href="https://minecraftcirclechart.com" className="text-indigo-600 hover:text-indigo-800 font-semibold"> Minecraft circle chart</a> 
            helps create pixel-perfect circular builds. Advanced students can explore 
            <a href="https://unitcircleradians.com" className="text-indigo-600 hover:text-indigo-800 font-semibold"> unit circle radians</a> 
            for trigonometric applications.
          </p>
        </div>

        {/* Related Calculators Grid */}
        <div className="bg-indigo-50 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Circle Calculator Network
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { name: "Circumference", url: "https://circumferenceofacircle.com", desc: "Calculate perimeter" },
              { name: "Radius Finder", url: "https://radiusofacircle.com", desc: "Find radius from area" },
              { name: "Diameter", url: "https://diameterofacircle.com", desc: "Calculate diameter" },
              { name: "Area Formula", url: "https://formulaforareaofacircle.com", desc: "πr² explained" },
              { name: "How-To Guide", url: "https://howtofindareaofacircle.com", desc: "Step-by-step tutorials" },
              { name: "Circle Equation", url: "https://circleequation.com", desc: "Algebraic form" },
              { name: "Unit Circle", url: "https://unitcircleradians.com", desc: "Radians & trig" },
              { name: "Surface Area", url: "https://surfaceareaofacircle.com", desc: "3D applications" }
            ].map((tool, index) => (
              <a key={index} href={tool.url} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-indigo-500 transition-colors group">
                <p className="font-bold text-gray-900 group-hover:text-indigo-600 mb-1">{tool.name}</p>
                <p className="text-sm text-gray-700 font-medium">{tool.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Clean Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">Core Tools</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://circumferenceofacircle.com" className="hover:text-white">Circumference</a></li>
                <li><a href="https://areaofcircle.com" className="hover:text-white font-semibold">Area (Current)</a></li>
                <li><a href="https://radiusofacircle.com" className="hover:text-white">Radius</a></li>
                <li><a href="https://diameterofacircle.com" className="hover:text-white">Diameter</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Formulas</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://circleareaformula.com" className="hover:text-white">Area Formula</a></li>
                <li><a href="https://circumferenceofacircleformula.com" className="hover:text-white">Circumference Formula</a></li>
                <li><a href="https://formulaforareaofacircle.com" className="hover:text-white">πr² Guide</a></li>
                <li><a href="https://equationofacircle.com" className="hover:text-white">Circle Equation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Tutorials</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://howtofindareaofacircle.com" className="hover:text-white">Find Area</a></li>
                <li><a href="https://howtofindcircumference.com" className="hover:text-white">Find Circumference</a></li>
                <li><a href="https://howtofindtheareaofacircle.com" className="hover:text-white">Area Tutorial</a></li>
                <li><a href="https://howtofindcircumferenceofacircle.com" className="hover:text-white">Circumference Guide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Specialized</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://unitcircleradians.com" className="hover:text-white">Unit Circle</a></li>
                <li><a href="https://minecraftcirclechart.com" className="hover:text-white">Minecraft Circles</a></li>
                <li><a href="https://circlepng.com" className="hover:text-white">Circle Images</a></li>
                <li><a href="https://radiancircle.com" className="hover:text-white">Radian Tools</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center text-sm text-gray-500 pt-8 border-t border-gray-800">
            © 2025 Circle Calculator Network. Professional mathematical tools.
          </div>
        </div>
      </footer>
    </div>
  );
}
