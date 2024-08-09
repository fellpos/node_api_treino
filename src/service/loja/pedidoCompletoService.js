


export function calcularTotal(parcelas, itens, cupom) {
    let total = 0;
    for (let produto of itens) {
        total += produto.preco;
    }

    if (parcelas > 1) {
        let juros = total * 0.05;
        total += juros;
    }
    
    if (cupom == "QUERO100") {
        total -= 100;
    }

    return total;
}

export function calcularValorParcela(total, parcelas) {
            
    let valorParcela = total / parcelas;
    return valorParcela;
}