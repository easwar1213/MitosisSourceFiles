namespace KMHSSS
{
    partial class Promotion_Non_Eligible_Student_Details_Frm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.Sec_CBox = new System.Windows.Forms.ComboBox();
            this.Section_CHBox = new System.Windows.Forms.CheckBox();
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.Class_CHBox = new System.Windows.Forms.CheckBox();
            this.AYear_CHBox = new System.Windows.Forms.CheckBox();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.Promotion_Non_Eligible_Student_Details_dataGridView1 = new System.Windows.Forms.DataGridView();
            this.SNo = new System.Windows.Forms.DataGridViewTextBoxColumn();
            this.label9 = new System.Windows.Forms.Label();
            this.View_Btn = new System.Windows.Forms.Button();
            this.Close_Btn = new System.Windows.Forms.Button();
            this.Print_Lbl = new System.Windows.Forms.Label();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.Promotion_Non_Eligible_Student_Details_dataGridView1)).BeginInit();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(28, 44);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(1311, 675);
            this.groupBox1.TabIndex = 32;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Promotion Non Eligible Student Details";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.View_Btn);
            this.groupBox2.Controls.Add(this.Close_Btn);
            this.groupBox2.Controls.Add(this.Sec_CBox);
            this.groupBox2.Controls.Add(this.Section_CHBox);
            this.groupBox2.Controls.Add(this.Class_CBox);
            this.groupBox2.Controls.Add(this.Class_CHBox);
            this.groupBox2.Controls.Add(this.AYear_CHBox);
            this.groupBox2.Controls.Add(this.EYear_Txt);
            this.groupBox2.Controls.Add(this.SYear_CBox);
            this.groupBox2.Location = new System.Drawing.Point(183, 26);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(916, 99);
            this.groupBox2.TabIndex = 8;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Select";
            // 
            // Sec_CBox
            // 
            this.Sec_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Sec_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Sec_CBox.FormattingEnabled = true;
            this.Sec_CBox.Location = new System.Drawing.Point(667, 36);
            this.Sec_CBox.Name = "Sec_CBox";
            this.Sec_CBox.Size = new System.Drawing.Size(99, 29);
            this.Sec_CBox.TabIndex = 272;
            this.Sec_CBox.SelectedIndexChanged += new System.EventHandler(this.Sec_CBox_SelectedIndexChanged);
            // 
            // Section_CHBox
            // 
            this.Section_CHBox.AutoSize = true;
            this.Section_CHBox.Location = new System.Drawing.Point(571, 38);
            this.Section_CHBox.Name = "Section_CHBox";
            this.Section_CHBox.Size = new System.Drawing.Size(82, 25);
            this.Section_CHBox.TabIndex = 274;
            this.Section_CHBox.Text = "Section";
            this.Section_CHBox.UseVisualStyleBackColor = true;
            this.Section_CHBox.CheckedChanged += new System.EventHandler(this.Section_CHBox_CheckedChanged);
            // 
            // Class_CBox
            // 
            this.Class_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Class_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Class_CBox.FormattingEnabled = true;
            this.Class_CBox.Location = new System.Drawing.Point(424, 36);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(123, 29);
            this.Class_CBox.TabIndex = 271;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            // 
            // Class_CHBox
            // 
            this.Class_CHBox.AutoSize = true;
            this.Class_CHBox.Location = new System.Drawing.Point(349, 40);
            this.Class_CHBox.Name = "Class_CHBox";
            this.Class_CHBox.Size = new System.Drawing.Size(64, 25);
            this.Class_CHBox.TabIndex = 273;
            this.Class_CHBox.Text = "Class";
            this.Class_CHBox.UseVisualStyleBackColor = true;
            this.Class_CHBox.CheckedChanged += new System.EventHandler(this.Class_CHBox_CheckedChanged);
            // 
            // AYear_CHBox
            // 
            this.AYear_CHBox.AutoSize = true;
            this.AYear_CHBox.Checked = true;
            this.AYear_CHBox.CheckState = System.Windows.Forms.CheckState.Checked;
            this.AYear_CHBox.Location = new System.Drawing.Point(34, 40);
            this.AYear_CHBox.Name = "AYear_CHBox";
            this.AYear_CHBox.Size = new System.Drawing.Size(73, 25);
            this.AYear_CHBox.TabIndex = 266;
            this.AYear_CHBox.Text = "AYear";
            this.AYear_CHBox.UseVisualStyleBackColor = true;
            this.AYear_CHBox.CheckedChanged += new System.EventHandler(this.AYear_CHBox_CheckedChanged);
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(226, 38);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(95, 28);
            this.EYear_Txt.TabIndex = 251;
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(116, 37);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(99, 29);
            this.SYear_CBox.TabIndex = 252;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.Promotion_Non_Eligible_Student_Details_dataGridView1);
            this.groupBox3.Location = new System.Drawing.Point(27, 136);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(1257, 511);
            this.groupBox3.TabIndex = 9;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "View";
            // 
            // Promotion_Non_Eligible_Student_Details_dataGridView1
            // 
            this.Promotion_Non_Eligible_Student_Details_dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.Promotion_Non_Eligible_Student_Details_dataGridView1.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.SNo});
            this.Promotion_Non_Eligible_Student_Details_dataGridView1.Location = new System.Drawing.Point(48, 37);
            this.Promotion_Non_Eligible_Student_Details_dataGridView1.Name = "Promotion_Non_Eligible_Student_Details_dataGridView1";
            this.Promotion_Non_Eligible_Student_Details_dataGridView1.Size = new System.Drawing.Size(1181, 450);
            this.Promotion_Non_Eligible_Student_Details_dataGridView1.TabIndex = 6;
            this.Promotion_Non_Eligible_Student_Details_dataGridView1.VirtualMode = true;
            this.Promotion_Non_Eligible_Student_Details_dataGridView1.CellValueNeeded += new System.Windows.Forms.DataGridViewCellValueEventHandler(this.Promotion_Non_Eligible_Student_Details_dataGridView1_CellValueNeeded);
            // 
            // SNo
            // 
            this.SNo.HeaderText = "SNo";
            this.SNo.Name = "SNo";
            this.SNo.ReadOnly = true;
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(515, 14);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(368, 27);
            this.label9.TabIndex = 33;
            this.label9.Text = "Promotion Non Eligible Student Details";
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(803, 23);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(89, 62);
            this.View_Btn.TabIndex = 277;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // Close_Btn
            // 
            this.Close_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Close_Btn.Location = new System.Drawing.Point(803, 23);
            this.Close_Btn.Name = "Close_Btn";
            this.Close_Btn.Size = new System.Drawing.Size(89, 62);
            this.Close_Btn.TabIndex = 276;
            this.Close_Btn.Text = "Close";
            this.Close_Btn.UseVisualStyleBackColor = true;
            this.Close_Btn.Click += new System.EventHandler(this.Close_Btn_Click);
            // 
            // Print_Lbl
            // 
            this.Print_Lbl.AutoSize = true;
            this.Print_Lbl.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.Print_Lbl.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(128)))), ((int)(((byte)(0)))));
            this.Print_Lbl.Location = new System.Drawing.Point(1215, 16);
            this.Print_Lbl.Name = "Print_Lbl";
            this.Print_Lbl.Size = new System.Drawing.Size(124, 27);
            this.Print_Lbl.TabIndex = 112;
            this.Print_Lbl.Text = "Print Report";
            this.Print_Lbl.Click += new System.EventHandler(this.Print_Lbl_Click);
            // 
            // Promotion_Non_Eligible_Student_Details_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.Print_Lbl);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.label9);
            this.Name = "Promotion_Non_Eligible_Student_Details_Frm";
            this.Text = "Promotion Non Eligible Student Details";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.Promotion_Non_Eligible_Student_Details_Frm_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.Promotion_Non_Eligible_Student_Details_dataGridView1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.ComboBox Sec_CBox;
        private System.Windows.Forms.CheckBox Section_CHBox;
        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.CheckBox Class_CHBox;
        private System.Windows.Forms.CheckBox AYear_CHBox;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.DataGridView Promotion_Non_Eligible_Student_Details_dataGridView1;
        private System.Windows.Forms.DataGridViewTextBoxColumn SNo;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.Button Close_Btn;
        private System.Windows.Forms.Label Print_Lbl;

    }
}