var documenterSearchIndex = {"docs":
[{"location":"API/#API","page":"API","title":"API","text":"","category":"section"},{"location":"API/#Infiltration-and-exfiltration","page":"API","title":"Infiltration and exfiltration","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"Add @infiltrate to any function to start the infil> REPL mode when that line runs.","category":"page"},{"location":"API/","page":"API","title":"API","text":"It's recommended to put Infiltrator.jl into your global environment and not into package environments for two reasons:","category":"page"},{"location":"API/","page":"API","title":"API","text":"Infiltrator.jl is intended as a development tool only and as such should not be shipped\nAny @infiltrate invocations in your package code will fail at compile-time, which prevents you from accidentally committing infiltrated code","category":"page"},{"location":"API/","page":"API","title":"API","text":"This means that you'll need to use Revise.jl, inline evaluation in VS Code, or just plain old @eval to apply @infiltrate statements in your package code.","category":"page"},{"location":"API/","page":"API","title":"API","text":"@infiltrate\n@infiltry\ninfiltrate\n@exfiltrate","category":"page"},{"location":"API/#Infiltrator.@infiltrate","page":"API","title":"Infiltrator.@infiltrate","text":"@infiltrate\n@infiltrate condition::Bool\n\n@infiltrate sets an infiltration point (or breakpoint).\n\nWhen the infiltration point is hit, it will drop you into an interactive REPL session that lets you inspect local variables and the call stack as well as execute arbitrary statements in the context of the current functions module.\n\nThis macro also accepts an optional argument cond that must evaluate to a boolean, and then this macro will serve as a \"conditional breakpoint\", which starts inspections only when its condition is true. For example:\n\n@infiltrate false # does not infiltrate\n\n\n\n\n\n","category":"macro"},{"location":"API/#Infiltrator.@infiltry","page":"API","title":"Infiltrator.@infiltry","text":"@infiltry expr\n\nWraps expression in a try block, infiltrate if an exception is raised. Equivalent to:\n\ntry\n    expr\ncatch\n    @infiltrate\nend\n\n\n\n\n\n","category":"macro"},{"location":"API/#Infiltrator.infiltrate","page":"API","title":"Infiltrator.infiltrate","text":"infiltrate(mod, locals, file, line)\n\nFunction form of @infiltrate. Use this to conditionally infiltrate package code without using e.g. Revise (because this version is valid during precompilation).\n\nThis would typically be used as\n\nif isdefined(Main, :Infiltrator)\n  Main.infiltrate(@__MODULE__, Base.@locals, @__FILE__, @__LINE__)\nend\n\n\n\n\n\n","category":"function"},{"location":"API/#Infiltrator.@exfiltrate","page":"API","title":"Infiltrator.@exfiltrate","text":"@exfiltrate\n\nAssigns all local variables into the global storage.\n\n\n\n\n\n","category":"macro"},{"location":"API/#The-safehouse","page":"API","title":"The safehouse","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"This is where all exfiltrated variables end up. You can either exfiltrate a variable explicitly with @exfiltrate or implicitly by assignment in the infil> REPL mode.","category":"page"},{"location":"API/","page":"API","title":"API","text":"safehouse\nInfiltrator.clear_store!\nInfiltrator.set_store!\nInfiltrator.@withstore","category":"page"},{"location":"API/#Infiltrator.safehouse","page":"API","title":"Infiltrator.safehouse","text":"safehouse\nexfiltrated\nInfiltrator.store\n\nGlobal storage for storing values while @infiltrateing or @exfiltrateing.\n\nAlso see clear_store!, set_store!, and @withstore for safehouse-related functionality.\n\n\n\n\n\n","category":"constant"},{"location":"API/#Infiltrator.clear_store!","page":"API","title":"Infiltrator.clear_store!","text":"clear_store!(s = safehouse)\n\nReset the store used for global symbols.\n\n\n\n\n\n","category":"function"},{"location":"API/#Infiltrator.set_store!","page":"API","title":"Infiltrator.set_store!","text":"set_store!(s = safehouse, m::Module)\n\nSet the module backing the store s.\n\n\n\n\n\n","category":"function"},{"location":"API/#Infiltrator.@withstore","page":"API","title":"Infiltrator.@withstore","text":"@withstore ex\n\nEvaluates the expression ex in the context of the global store.\n\nMainly intended for interactive use, as changes to the store's state will not propagate into the returned expression.\n\n\n\n\n\n","category":"macro"},{"location":"API/#Utility","page":"API","title":"Utility","text":"","category":"section"},{"location":"API/","page":"API","title":"API","text":"Infiltrator.clear_disabled!\nInfiltrator.end_session!\nInfiltrator.toggle_async_check","category":"page"},{"location":"API/#Infiltrator.clear_disabled!","page":"API","title":"Infiltrator.clear_disabled!","text":"clear_disabled!(s = safehouse)\n\nClear all disabled infiltration points.\n\n\n\n\n\n","category":"function"},{"location":"API/#Infiltrator.end_session!","page":"API","title":"Infiltrator.end_session!","text":"end_session!(s = safehouse)\n\nEnd this infiltration session (reverts the effect of @exit in the debug> REPL).\n\nOnly needs to be manually called on Julia versions prior to 1.5.\n\n\n\n\n\n","category":"function"},{"location":"API/#Infiltrator.toggle_async_check","page":"API","title":"Infiltrator.toggle_async_check","text":"toggle_async_check(enabled)\n\nEnable or disable the check for safe REPL mode switching. May result in a non-functional REPL.\n\n\n\n\n\n","category":"function"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"<div align=\"center\">\n<picture>\n  <source media=\"(prefers-color-scheme: dark)\" srcset=\"assets/logo-dark.svg\">\n  <source media=\"(prefers-color-scheme: light)\" srcset=\"assets/logo.svg\">\n  <img alt=\"Infiltrator Logo\" src=\"assets/logo.svg\" width=\"150px\">\n</picture>\n</div>","category":"page"},{"location":"#Infiltrator.jl","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"","category":"section"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"(Image: CI) (Image: Codecov) (Image: version)","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"(Image: docs stable) (Image: docs dev)","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"This packages provides the @infiltrate macro, which acts as a breakpoint with negligible runtime performance overhead.","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"Note that you cannot access other function scopes or step into further calls. Use an actual debugger if you need that level of flexibility.","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"Running code that ends up triggering the @infiltrate REPL mode via inline evaluation in VS Code or Juno can cause issues, so it's recommended to always use the REPL directly.","category":"page"},{"location":"#@infiltrate","page":"Infiltrator.jl","title":"@infiltrate","text":"","category":"section"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"@infiltrate\n@infiltrate condition::Bool","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"@infiltrate sets an infiltration point.","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"When the infiltration point is hit, it will drop you into an interactive REPL session that lets you inspect local variables and the call stack as well as execute arbitrary statements in the context of the current local and global scope.","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"The optional argument cond only enables this infiltration point if it evaluates to true, e.g.","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"@infiltrate false # does not infiltrate","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"You can also use","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"if isdefined(Main, :Infiltrator)\n  Main.infiltrate(@__MODULE__, Base.@locals, @__FILE__, @__LINE__)\nend","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"to infiltrate package code without any post-hoc evaluation into the module (because the functional form does not require Infiltrator to be loaded at compiletime).","category":"page"},{"location":"#The-safehouse","page":"Infiltrator.jl","title":"The safehouse","text":"","category":"section"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"Exfiltrating variables (with @exfiltrate or by assignment in an @infiltrate session) happens by assigning the variable to a global storage space (backed by a module); any exfiltrated objects can be directly accessed, via Infiltrator.store or its exported aliases safehouse or exfiltrated:","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"julia> foo(x) = @exfiltrate\nfoo (generic function with 1 method)\n\njulia> foo(3)\n\njulia> safehouse.x # or exfiltrated.x\n3","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"You can reset the safehouse with Infiltrator.clear_store!().","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"You can also assign a specific module with Infiltrator.set_store!(mod). This allows you to e.g. set the backing module to Main and therefore export the contents of the safehouse to the global namespace (although doing so is not recommended).","category":"page"},{"location":"#Usage","page":"Infiltrator.jl","title":"Usage","text":"","category":"section"},{"location":"#Scripts-and-package-development","page":"Infiltrator.jl","title":"Scripts and package development","text":"","category":"section"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"Using Infiltrator for debugging packages or scripts requires a little bit of setup.","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"Either your current environment or an environment futher down the environment stack","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"must contain Infiltrator.jl. I would recommend putting Infiltrator.jl into your global @v1.xx environment so that it is always available.","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"Load Revise.jl or use VS Code's inline evaluation","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"to seamlessly update your package code.","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"Load your package.\nAdd Main.@infiltrate statements as breakpoints wherever desired.\nRun a function that ends up executing the method containing the breakpoint.","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"The ordering of steps 3 and 4 is important: loading your package after adding Main.@infiltrate statements will prevent if from loading, because that macro does not exist during precompilation.","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"If you absolutely cannot modfiy your code after loading it initially, then the infiltrate function can be used instead. An advantage of the macro form is that it will fail tests, so you don't end up committing or merging code containing infiltration points.","category":"page"},{"location":"#REPL-session","page":"Infiltrator.jl","title":"REPL session","text":"","category":"section"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"julia> function f(x)\n         out = []\n         for i in x\n           push!(out, 2i)\n           @infiltrate\n         end\n         out\n       end\nf (generic function with 1 method)\n\njulia> f([1,2,3,4,5,6,7,8,9,10])\nInfiltrating f(x::Vector{Int64})\n  at REPL[10]:5\n\ninfil> ?\n  Code entered here is evaluated in the current scope. Changes to local variables are not possible; global variables can only be changed with eval/@eval.\n\n  All assignments will end up in the safehouse.\n\n  The following commands are special cased:\n\n    •  ?: Print this help text.\n\n    •  @trace: Print the current stack trace.\n\n    •  @locals: Print local variables. @locals x y only prints x and y.\n\n    •  @exception: Print the exception that triggered the current @infiltry session, if any.\n\n    •  @exfiltrate: Save all local variables into the store. @exfiltrate x y saves x and y; this variant can also exfiltrate variables defined in the infil> REPL.\n\n    •  @toggle: Toggle infiltrating at this @infiltrate spot (clear all with Infiltrator.clear_disabled!()).\n\n    •  @cond expr: Infiltrate at this @infiltrate spot only if <expr> evaluates to true (clear all with\n       Infiltrator.clear_conditions!()).\n\n    •  @continue: Continue to the next infiltration point or exit (shortcut: Ctrl-D).\n\n    •  @doc symbol: Get help for symbol (same as in the normal Julia REPL).\n\n    •  @exit: Stop infiltrating for the remainder of this session and exit (on Julia versions prior to 1.5 this needs to be manually cleared with Infiltrator.end_session!()).\n\ninfil> @locals\n- out::Vector{Any} = Any[2]\n- i::Int64 = 1\n- x::Vector{Int64} = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\ninfil> 0//0\nERROR: ArgumentError: invalid rational: zero(Int64)//zero(Int64)\nStacktrace:\n [1] __throw_rational_argerror_zero(T::Type)\n   @ Base ./rational.jl:32\n [2] Rational{Int64}(num::Int64, den::Int64)\n   @ Base ./rational.jl:34\n [3] Rational\n   @ ./rational.jl:39 [inlined]\n [4] //(n::Int64, d::Int64)\n   @ Base ./rational.jl:62\n [5] top-level scope\n   @ none:1\n\ninfil> @toggle\nDisabled infiltration at this infiltration point.\n\ninfil> @toggle\nEnabled infiltration at this infiltration point.\n\ninfil> @cond i > 5\nConditionally enabled infiltration at this infiltration point.\n\ninfil> @continue\n\nInfiltrating f(x::Vector{Int64})\n  at REPL[10]:5\n\ninfil> i\n6\n\ninfil> intermediate = copy(out)\n6-element Vector{Any}:\n  2\n  4\n  6\n  8\n 10\n 12\n\ninfil> @exfiltrate intermediate x\nExfiltrating 2 local variables into the safehouse.\n\ninfil> @exit\n\n10-element Vector{Any}:\n  2\n  4\n  6\n  8\n 10\n 12\n 14\n 16\n 18\n 20\n\n\njulia> safehouse.intermediate\n6-element Vector{Any}:\n  2\n  4\n  6\n  8\n 10\n 12\n\njulia> @withstore begin\n         x = 23\n         x .* intermediate\n       end\n6-element Vector{Int64}:\n  46\n  92\n 138\n 184\n 230\n 276","category":"page"},{"location":"#Advanced","page":"Infiltrator.jl","title":"Advanced","text":"","category":"section"},{"location":"#Auto-loading-Infiltrator.jl","page":"Infiltrator.jl","title":"Auto-loading Infiltrator.jl","text":"","category":"section"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"Infiltrator loads very fast (~3ms on my machine) and is generally safe to load in startup.jl.","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"If, for whatever reason, you do not want to unconditionally load Infiltrator in your startup.jl, you can use the following convenience macro instead. It will automatically load Infiltrator.jl (if it is in your environment stack) and subsequently call @infiltrate:","category":"page"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"macro autoinfiltrate(cond=true)\n    pkgid = Base.PkgId(Base.UUID(\"5903a43b-9cc3-4c30-8d17-598619ec4e9b\"), \"Infiltrator\")\n    if !haskey(Base.loaded_modules, pkgid)\n        try\n            Base.eval(Main, :(using Infiltrator))\n        catch err\n            @error \"Cannot load Infiltrator.jl. Make sure it is included in your environment stack.\"\n        end\n    end\n    i = get(Base.loaded_modules, pkgid, nothing)\n    lnn = LineNumberNode(__source__.line, __source__.file)\n\n    if i === nothing\n        return Expr(\n            :macrocall,\n            Symbol(\"@warn\"),\n            lnn,\n            \"Could not load Infiltrator.\")\n    end\n\n    return Expr(\n        :macrocall,\n        Expr(:., i, QuoteNode(Symbol(\"@infiltrate\"))),\n        lnn,\n        esc(cond)\n    )\nend","category":"page"},{"location":"#Related-projects","page":"Infiltrator.jl","title":"Related projects","text":"","category":"section"},{"location":"","page":"Infiltrator.jl","title":"Infiltrator.jl","text":"@exfiltrate for Python","category":"page"}]
}
