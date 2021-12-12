

let d = 256;
function search()
{
    let pat = document.getElementById( "pattern_").value;
    let txt =document.getElementById( "string_").value;
    let q = 101;
	let M = pat.length;
	let N = txt.length;
	let i, j;
	let ans = "";
    let steps = "";
    
	// Hash value for pattern
	let p = 0;
	
	// Hash value for txt
	let t = 0;
	let h = 1;

    steps = steps + "\n\n\npattern = " + pat + "\nstring = " + txt + "\n";




	// The value of h would be "pow(d, M-1)%q"
	for(i = 0; i < M - 1; i++)
		h = (h * d) % q;

        steps = steps + "h = " + h + "\n";
	// Calculate the hash value of pattern and
	// first window of text
	for(i = 0; i < M; i++)
	{
		p = (d * p + pat[i].charCodeAt()) % q;
		t = (d * t + txt[i].charCodeAt()) % q;
        steps = steps + "iterator = " + i + " : value of p is " + p + " and value of q is " + q + "\n";
	}
    steps = steps + "\n\n";
	// Slide the pattern over text one by one
	for(i = 0; i <= N - M; i++)
	{

        steps = steps + "iterator = " + i + " : ";
		// Check the hash values of current
		// window of text and pattern. If the
		// hash values match then only
		// check for characters on by one
		if (p == t)
		{ 
			
			/* Check for characters one by one */
			for(j = 0; j < M; j++)
			{
				if (txt[i+j] != pat[j])
					break;
			}

			// if p == t and pat[0...M-1] =
			// txt[i, i+1, ...i+M-1]
			if (j == M){
                steps = steps + "Pattern Found!\n";
				// document.write("Pattern found at index " +
								// i + "<br/>");

                ans = ans + "Pattern Found at Index " + i + "\n";
            }else{
                steps = steps + "Pattern Not Found!\n";
            }
		}else{
            steps = steps + " P and T do not match!\n";
        }

		// Calculate hash value for next window
		// of text: Remove leading digit, add
		// trailing digit
		if (i < N - M)
		{
			t = (d * (t - txt[i].charCodeAt() * h) +
					txt[i + M].charCodeAt()) % q;

            steps = steps + "\nt = " +  t + "\n";
			// We might get negative value of t,
			// converting it to positive
			if (t < 0)
				t = (t + q);
		}
	}
    ans = ans + steps;
    document.getElementById( "outputbox").value = ans;
}

